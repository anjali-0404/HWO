# Backend (Express + TypeScript)

This backend provides APIs for:
- **AI**: `/api/ai/predict`, `/api/ai/train`
- **Leaderboard**: `/api/leaderboard` (GET list, POST new)
- **Health**: `/api/health`

It uses MongoDB via Mongoose, supports CORS, and can optionally proxy to an external ML microservice (`ML_SERVICE_URL`).

## Quickstart (Local)

```bash
cd backend-express-ts
cp .env.example .env
npm install
npm run dev
```

Make sure MongoDB is running (or use Docker below).

## With Docker Compose

```bash
cd backend-express-ts
cp .env.example .env
docker compose up --build
```

API at `http://localhost:8080`

## Endpoints

### POST /api/ai/predict
Body (JSON):
```json
{ "text": "hello world" }
```
Response:
```json
{ "source": "mock", "prediction": "ok", "confidence": 0.73, "score": 42 }
```

### POST /api/ai/train
Send `multipart/form-data` with key `files` for uploads, or JSON:
```json
{ "dataset": "v1" }
```

### GET /api/leaderboard
Returns top 50 scores (desc).

### POST /api/leaderboard
Body:
```json
{ "user": "aastha", "score": 95 }
```

## Connecting a Python ML Service (optional)
Set `ML_SERVICE_URL=http://localhost:9000` and start your FastAPI/Flask app exposing `/predict` and `/train`. The backend will proxy to it.

## Frontend Integration (Next.js)
Use an env var in `studio-main`:
```
# studio-main/.env.local
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

Then, in Next.js code:
```ts
export async function predict(input: any) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ai/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!r.ok) throw new Error('Prediction failed');
  return r.json();
}

export async function submitScore(user: string, score: number) {
  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/leaderboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score })
  });
  if (!r.ok) throw new Error('Score submit failed');
  return r.json();
}
```

Place these helpers in `studio-main/src/lib/api.ts` and call them from your pages/components.
