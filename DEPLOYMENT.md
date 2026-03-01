# Docker Deployment Guide

## Quick Start (Development)

1. **Start services:**
```bash
docker-compose up --build
```

2. **Access services:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Production Deployment

### Option 1: With Nginx Reverse Proxy

1. **Build and start all services:**
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

2. **Access application:**
   - http://localhost (or your domain)

### Option 2: Separate Deployments

#### Backend Only
```bash
docker build -f Dockerfile.backend -t mipi-camera-backend .
docker run -d -p 8000:8000 -v ./backend/data:/app/data mipi-camera-backend
```

#### Frontend Only
```bash
docker build -f Dockerfile.frontend -t mipi-camera-frontend .
docker run -d -p 3000:3000 -e NEXT_PUBLIC_API_BASE=http://your-api-domain:8000 mipi-camera-frontend
```

## Cloud Deployment

### AWS ECS
1. Push images to ECR
2. Create ECS task definitions
3. Set up ALB (Application Load Balancer)
4. Configure auto-scaling

### Google Cloud Run
```bash
# Backend
gcloud run deploy mipi-camera-backend \
  --image gcr.io/PROJECT_ID/mipi-camera-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Frontend
gcloud run deploy mipi-camera-frontend \
  --image gcr.io/PROJECT_ID/mipi-camera-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Apps
1. Create Azure Container Registry
2. Push images
3. Create Container Apps with proper environment variables

## Environment Variables

### Backend
- `DATABASE_PATH`: Path to SQLite database (default: /app/data/camera_modules.db)

### Frontend
- `NEXT_PUBLIC_API_BASE`: Backend API URL
  - Development: http://localhost:8000
  - Production: http://your-domain.com

## Volume Mounts

For persistent database storage:
```bash
# Create data directory
mkdir -p backend/data

# Mount when running
docker run -v $(pwd)/backend/data:/app/data ...
```

## Health Checks

- Backend: http://localhost:8000/health
- Frontend: Built-in Next.js health checks

## Troubleshooting

### Frontend can't connect to backend
- Ensure `NEXT_PUBLIC_API_BASE` points to correct backend URL
- Check CORS settings in backend
- Verify network connectivity between containers

### Database not persisting
- Check volume mount paths
- Ensure data directory has proper permissions

### Build fails
- Clear Docker cache: `docker system prune -a`
- Rebuild: `docker-compose build --no-cache`
