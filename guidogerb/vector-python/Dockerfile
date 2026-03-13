FROM python:3.11-slim

WORKDIR /app

# Install poetry
RUN pip install poetry

# Copy project files
COPY pyproject.toml ./
COPY src/ ./src/

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Expose port
EXPOSE 8082

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8082"]
