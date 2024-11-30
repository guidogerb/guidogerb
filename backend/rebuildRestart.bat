@echo off
echo Stopping running processes...
:: Kill any running node processes (frontend)
taskkill /F /IM node.exe /T 2>nul
:: Kill any running java processes (backend)
taskkill /F /IM java.exe /T 2>nul

echo Cleaning node_modules and Maven target...
:: Remove frontend build artifacts
cd frontend
rmdir /s /q node_modules 2>nul
rmdir /s /q build 2>nul
cd ..

echo Cleaning and rebuilding project...
:: Clean and rebuild with Maven
call mvn clean install

echo Starting frontend...
:: Start frontend in a new window
start cmd /k "cd frontend && npm run dev"

echo Starting backend...
:: Start backend in a new window
start cmd /k "mvn spring-boot:run"

echo Rebuild complete! Applications are starting...
