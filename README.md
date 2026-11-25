# NexusCampus events

This repository contains the Flask/Supabase API in `backend/` and the Vite frontend in `frontend/`.

## Run locally

1. Configure `backend/.env` from `backend/.env.example` with the Supabase project URL and publishable key.
2. Install backend requirements and start Flask from `backend/`:

   ```sh
   pip install -r requirements.txt
   python app.py
   ```

3. Configure `frontend/.env` from `frontend/.env.example` (`VITE_API_URL=http://localhost:5000`), then start Vite from `frontend/`:

   ```sh
   npm install
   npm run dev
   ```

See [frontend deployment instructions](frontend/README.md) for Vercel setup and production CORS configuration.
