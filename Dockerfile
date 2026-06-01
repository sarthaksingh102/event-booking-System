# Stage 1: Build the React Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# We set VITE_API_URL to relative path so it hits the Spring Boot backend running on the same host
ENV VITE_API_URL=/api
RUN npm run build

# Stage 2: Build the Spring Boot Backend
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/src ./src

# Copy the built frontend into Spring Boot's static resources folder
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static

# Build the Spring Boot application
RUN mvn clean package -DskipTests

# Stage 3: Run the Application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=backend-build /app/backend/target/local-event-booking-system-1.0-SNAPSHOT.jar app.jar

# Hugging Face Spaces requires exposing port 7860
EXPOSE 7860

# We create a new user to run the app to adhere to Hugging Face security best practices
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app
COPY --chown=user --from=backend-build /app/backend/target/local-event-booking-system-1.0-SNAPSHOT.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
