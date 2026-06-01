@echo off
REM ==============================================================
REM Event Booking System - Complete Setup and Run Script
REM ==============================================================
REM This script sets up and runs the entire application
REM Prerequisites: Java 17+, Maven 3.8+, MySQL 8.0+, Node.js 16+
REM ==============================================================

echo.
echo ====================================================
echo  Event Booking System - Setup & Run
echo ====================================================
echo.

REM Check if Maven is installed
maven -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Maven is not installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
    echo And add it to your system PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in PATH
    echo Please install Java 17+ from: https://jdk.java.net/
    pause
    exit /b 1
)

echo [OK] All prerequisites found
echo.

REM Step 1: Build Backend
echo ====================================================
echo Step 1: Building Backend...
echo ====================================================
cd backend
call mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed
    pause
    exit /b 1
)
cd ..
echo [OK] Backend built successfully
echo.

REM Step 2: Install Frontend Dependencies
echo ====================================================
echo Step 2: Installing Frontend Dependencies...
echo ====================================================
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend dependency installation failed
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend dependencies installed
echo.

REM Step 3: Display Run Instructions
echo ====================================================
echo Step 3: Running Application...
echo ====================================================
echo.
echo To start the application, open TWO NEW COMMAND WINDOWS and run:
echo.
echo WINDOW 1 - Backend (port 8080):
echo   cd backend
echo   mvn spring-boot:run
echo.
echo WINDOW 2 - Frontend (port 5173):
echo   cd frontend
echo   npm run dev
echo.
echo Then access:
echo   Frontend: http://localhost:5173
echo   Backend API: http://localhost:8080/api
echo.
echo Test Credentials:
echo   Email: admin@example.com  (or user@example.com)
echo   Password: password123
echo.
echo ====================================================
pause
