@echo off
echo Stopping running processes...
:: Kill any running node processes (frontend)
taskkill /F /IM node.exe /T 2>nul
:: Kill any running java processes (backend)
taskkill /F /IM java.exe /T 2>nul
