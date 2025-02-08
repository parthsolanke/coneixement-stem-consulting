# Backend Service

## Docker Setup Guide

### Prerequisites
- Docker installed on your system
- `.env` file with required environment variables

### Building the Docker Image
```bash
docker build -t stem-api .
```

### Running the Container
```bash
docker run -p 8000:8000 \
  -e GEMINI_API_KEY=your-api-key \
  -e MODEL=gemini-1.5-flash \
  stem-api
```

### Checking Container Status
```bash
docker ps
```

### Stopping the Container
```bash
docker stop stem-api
```

### Local Development
For local development without Docker:
1. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the application
```bash
python -m uvicorn api.server:app --reload
```

## API Documentation
Once running, access the API documentation at:
- Swagger UI: http://localhost:8000/api/docs
- OpenAPI JSON: http://localhost:8000/api/openapi.json
