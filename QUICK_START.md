# 🚀 Quick Start Guide - Event Booking System

## ⚡ 3 Command Setup (After Prerequisites)

### **Prerequisites Installed?**
- ✅ Java 17+
- ✅ Maven 3.8+
- ✅ Node.js 16+
- ✅ MySQL 8.0+

---

## **Step 1: Database (SQL)**
```sql
CREATE DATABASE event_booking_system;
USE event_booking_system;

-- Copy schema.sql contents from database/schema.sql
-- OR Run the SQL file directly
```

---

## **Step 2: Backend Terminal**
```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

✅ Runs on: http://localhost:8080/api

---

## **Step 3: Frontend Terminal (NEW WINDOW)**
```bash
cd frontend
npm install
npm run dev
```

✅ Opens at: http://localhost:5173

---

## **🔑 Login Credentials**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| User | user@example.com | password123 |

---

## **📱 Key Features**

- 🔐 Secure JWT Authentication
- 📅 Event Listing & Filtering
- 🎫 Ticket Booking System
- 👨‍💼 Admin Dashboard
- 📧 Email Notifications
- 📊 Booking Analytics

---

## **❌ If Commands Don't Work**

1. **Maven not found**: Add Maven to Windows PATH
2. **npm not found**: Install Node.js from nodejs.org
3. **MySQL error**: Start MySQL Service
4. **Port 8080 taken**: Kill process with `taskkill /PID <PID> /F`

---

## **📚 Detailed Guide**
See: `COMPLETE_README.md` for full setup instructions

---

**Done! Access the app at http://localhost:5173** 🎉
