# 🚀 Event Booking System - Setup & Run Guide

## 📋 Project Overview

**Local Event Booking System** is a full-stack web application for booking local events.

### Technology Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + React Router v6
- **Backend**: Spring Boot 2.6.6 + Java 17 + Spring Security + JWT
- **Database**: MySQL
- **Port Configuration**:
  - Frontend: `http://localhost:5173`
  - Backend: `http://localhost:8080/api`

### Key Features
✅ User Registration & JWT Authentication  
✅ Browse & Search Events  
✅ Book Tickets with Availability Check  
✅ Booking History Dashboard  
✅ Admin Panel for Event Management  
✅ REST API with Security  

---

## 🗄️ Database Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE event_booking_system;
USE event_booking_system;
```

### 2. Run SQL Scripts
Execute the schema and sample data scripts in this order:
1. `database/schema.sql` - Creates tables
2. `database/sample-data.sql` - Adds sample events

**Using MySQL CLI:**
```bash
mysql -u root -p event_booking_system < database/schema.sql
mysql -u root -p event_booking_system < database/sample-data.sql
```

### 3. Update Database Credentials (if needed)
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_booking_system
spring.datasource.username=root
spring.datasource.password=root
```

---

## 🔧 Backend Setup & Run

### Step 1: Install Dependencies
```bash
cd backend
mvn clean install
```

### Step 2: Start Backend Server
```bash
# Option A: Using Maven
mvn spring-boot:run

# Option B: Run compiled JAR
mvn clean package
java -jar target/local-event-booking-system-1.0-SNAPSHOT.jar
```

✅ Backend runs on: `http://localhost:8080/api`

### Verify Backend is Running
Test with curl:
```bash
curl http://localhost:8080/api/events
```

---

## 🎨 Frontend Setup & Run

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

✅ Frontend runs on: `http://localhost:5173`

**Frontend will automatically proxy API calls to backend!**

### Step 3: Open in Browser
Navigate to: **`http://localhost:5173`**

---

## 📝 Testing the Application

### 1. Register a New User
- Go to `/register`
- Enter name, email, and password
- Click "Register"

### 2. Login
- Go to `/login`
- Enter email and password
- Click "Login"

### 3. Browse Events
- Click "Events" in navbar
- View available events from database

### 4. Book Tickets
- Select an event
- Enter quantity
- Click "Book"
- View confirmation

### 5. View Booking History
- Click "My Bookings"
- See all your bookings

### 6. Admin Panel
- Login as admin (if user has admin role)
- Go to `/admin`
- Manage events and view analytics

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Events
- `GET /api/events` - List all events
- `GET /api/events/{id}` - Get event details
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/{id}` - Update event (Admin)
- `DELETE /api/events/{id}` - Delete event (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `GET /api/bookings/all` - Get all bookings (Admin)

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: 
- Ensure backend is running on port 8080
- Check database connection
- Verify `application.properties` database credentials

### Issue: "Port 5173 already in use"
**Solution**:
```bash
# Change port in vite.config.js
# Or kill the process using port 5173
# Windows: netstat -ano | findstr :5173
```

### Issue: "Database connection error"
**Solution**:
- Verify MySQL is running
- Check database exists: `event_booking_system`
- Verify credentials in `application.properties`
- Run SQL scripts again

### Issue: "Login not working"
**Solution**:
- Check backend is running
- Verify JWT secret in `application.properties`
- Check browser console for errors
- Verify database has user data

### Issue: "Cannot book tickets"
**Solution**:
- Ensure you're logged in (token in localStorage)
- Check browser DevTools → Network tab for errors
- Verify event exists in database
- Check booking quantity doesn't exceed capacity

---

## 📦 Build for Production

### Build Frontend
```bash
cd frontend
npm run build
```
Creates optimized `dist/` folder

### Build Backend
```bash
cd backend
mvn clean package
```
Creates JAR in `backend/target/`

---

## 🔐 Security Notes

⚠️ **Change these in production:**
- JWT Secret in `application.properties`
- Database password (currently: `root`)
- Email credentials for confirmations
- CORS origins in SecurityConfig

---

## 📂 Project Structure

```
local-event-booking-system/
├── frontend/
│   ├── src/
│   │   ├── components/    (UI Components)
│   │   ├── pages/        (Page Components)
│   │   ├── context/      (AuthContext, BookingContext)
│   │   ├── services/     (API calls)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/main/java/com/eventbooking/
│   │   ├── controller/   (REST Endpoints)
│   │   ├── service/      (Business Logic)
│   │   ├── model/        (Database Entities)
│   │   └── repository/   (Data Access)
│   ├── pom.xml
│   └── src/main/resources/application.properties
├── database/
│   ├── schema.sql
│   └── sample-data.sql
├── docs/
│   ├── API_DOCUMENTATION.md
│   └── postman-collection.json
└── README.md
```

---

## ✅ Quick Start Checklist

- [ ] MySQL database created and scripts executed
- [ ] Backend dependencies installed: `mvn clean install`
- [ ] Backend running: `mvn spring-boot:run`
- [ ] Frontend dependencies installed: `npm install`
- [ ] Frontend running: `npm run dev`
- [ ] Access frontend at `http://localhost:5173`
- [ ] Register and login successfully
- [ ] Browse events
- [ ] Book tickets
- [ ] View booking history

---

## 🆘 Need Help?

1. Check console logs for errors
2. Verify all prerequisites are installed
3. Check database connectivity
4. Review API documentation in `docs/`
5. Test API endpoints with Postman collection

**Enjoy using the Event Booking System! 🎉**
