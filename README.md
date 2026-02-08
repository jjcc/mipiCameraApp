# MIPI Camera App (Next.js + FastAPI)

This repo now contains:

- `backend/`: FastAPI service reading `camera_modules.db`
- `frontend/`: Next.js app consuming backend API

## Backend setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Test health endpoint:

```powershell
curl http://127.0.0.1:8000/health
```

## Frontend setup

```powershell
cd frontend
npm install
$env:NEXT_PUBLIC_API_BASE="http://127.0.0.1:8000"
npm run dev
```

Open <http://localhost:3000>.

## API endpoints

- `GET /health`
- `GET /api/modules?q=&limit=20&offset=0`
- `GET /api/modules/{id}`
