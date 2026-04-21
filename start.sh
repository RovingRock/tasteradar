#!/bin/bash

# Run database migrations (create tables)
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
