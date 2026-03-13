#!/bin/bash

# Start all Python services individually (without Docker)

echo "Starting GuidoGerb Python Services..."

# Start backend
cd guidogerb/app/backend-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8080 &
BACKEND_PID=$!

# Start blockchain voting
cd ../../blockchainvoting-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8081 &
BLOCKCHAIN_PID=$!

# Start vector service
cd ../vector-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8082 &
VECTOR_PID=$!

# Start fsutil
cd ../fsutil-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8083 &
FSUTIL_PID=$!

# Start communique
cd ../communique-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8084 &
COMMUNIQUE_PID=$!

# Start bridge-gapp
cd ../bridge-gapp-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8085 &
BRIDGE_PID=$!

# Start pojo-generator
cd ../pojo-generator-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8086 &
POJO_PID=$!

# Start ids
cd ../ids-python
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8087 &
IDS_PID=$!

echo "All services started!"
echo "Backend: http://localhost:8080/docs (PID: $BACKEND_PID)"
echo "Blockchain: http://localhost:8081/docs (PID: $BLOCKCHAIN_PID)"
echo "Vector: http://localhost:8082/docs (PID: $VECTOR_PID)"
echo "Fsutil: http://localhost:8083/docs (PID: $FSUTIL_PID)"
echo "Communique: http://localhost:8084/docs (PID: $COMMUNIQUE_PID)"
echo "Bridge: http://localhost:8085/docs (PID: $BRIDGE_PID)"
echo "Generator: http://localhost:8086/docs (PID: $POJO_PID)"
echo "IDS: http://localhost:8087/docs (PID: $IDS_PID)"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
wait
