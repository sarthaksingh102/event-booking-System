# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first for caching
RUN mvn dependency:go-offline -B
# Copy source code
COPY src ./src
# Build the application
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/target/local-event-booking-system-1.0-SNAPSHOT.jar app.jar
# Expose the dynamic port used by Render
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
