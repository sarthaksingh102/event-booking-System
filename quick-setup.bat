@echo off
echo.
echo ========================================
echo EVENT BOOKING SYSTEM - QUICK START
echo ========================================
echo.

REM Check prerequisites
echo [1/5] Checking prerequisites...
where java >nul 2>nul || (echo ERROR: Java not found. Please install JDK 17+. && exit /b 1)
where mvn >nul 2>nul || (echo ERROR: Maven not found. Please install Maven. && exit /b 1)
where node >nul 2>nul || (echo ERROR: Node.js not found. Please install Node.js 16+. && exit /b 1)
echo ✓ All prerequisites found

echo.
echo [2/5] Building backend...
cd backend
call mvn clean install -q
if errorlevel 1 (
    echo ERROR: Maven build failed
    exit /b 1
)
cd ..
echo ✓ Backend built successfully

echo.
echo [3/5] Installing frontend dependencies...
cd frontend
call npm install -q
if errorlevel 1 (
    echo ERROR: npm install failed
    exit /b 1
)
cd ..
echo ✓ Frontend dependencies installed

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Setup MySQL Database:
echo    - Create database: CREATE DATABASE event_booking_system;
echo    - Import schema:   mysql -u root -p event_booking_system ^< database/schema.sql
echo    - Import data:     mysql -u root -p event_booking_system ^< database/sample-data.sql
echo.
echo 2. Start Backend (Terminal 1):
echo    cd backend
echo    mvn spring-boot:run
echo    Expected: http://localhost:8080/api
echo.
echo 3. Start Frontend (Terminal 2):
echo    cd frontend
echo    npm run dev
echo    Expected: http://localhost:5173
echo.
echo 4. Open Browser:
echo    http://localhost:5173
echo.
echo For detailed setup guide, see: SETUP_AND_RUN.md
echo ========================================
echo.
pause
