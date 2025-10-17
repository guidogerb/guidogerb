#!/bin/bash

# Quick start script for backend-python

set -e

echo "🚀 GuidoGerb Backend - Quick Start"
echo "=================================="
echo ""

# Check if Poetry is installed
if ! command -v poetry &> /dev/null; then
    echo "❌ Poetry is not installed. Installing..."
    curl -sSL https://install.python-poetry.org | python3 -
    export PATH="$HOME/.local/bin:$PATH"
fi

# Install dependencies
echo "📦 Installing dependencies..."
poetry install

# Copy .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration"
fi

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "⚠️  PostgreSQL is not running. Starting with Docker..."
    docker-compose up -d db
    sleep 5
fi

# Run migrations
echo "🔄 Running database migrations..."
poetry run alembic upgrade head

# Start the application
echo ""
echo "✅ Setup complete! Starting the application..."
echo ""
echo "📚 API Documentation:"
echo "   - Swagger UI: http://localhost:8080/docs"
echo "   - ReDoc: http://localhost:8080/redoc"
echo ""

poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
