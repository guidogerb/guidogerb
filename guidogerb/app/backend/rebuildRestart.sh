#!/bin/bash

echo "Stopping running processes..."
# Kill frontend processes
pkill -f "node"
# Kill backend processes
pkill -f "java.*demo"

echo "Cleaning and rebuilding project..."
# Clean and rebuild with Maven
mvn clean install

echo "Starting frontend..."
# Start frontend in new terminal
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/frontend && npm run dev"' 2>/dev/null || \
gnome-terminal -- bash -c "cd frontend && npm run dev" 2>/dev/null || \
xterm -e "cd frontend && npm run dev" 2>/dev/null &

echo "Starting backend..."
# Start backend in new terminal
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && mvn spring-boot:run"' 2>/dev/null || \
gnome-terminal -- bash -c "mvn spring-boot:run" 2>/dev/null || \
xterm -e "mvn spring-boot:run" 2>/dev/null &

echo "Rebuild complete! Applications are starting..."
