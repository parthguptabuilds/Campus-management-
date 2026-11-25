# NexusCampus frontend

## Run locally

```sh
npm install
npm run dev
```

Set `VITE_API_URL` in `.env` to the backend base URL (locally, `http://localhost:5000`). See `.env.example`.

## Deploy to Vercel

1. Import the repository into Vercel and set **Root Directory** to `frontend`.
2. Keep the configured Vite build command (`npm run build`) and output directory (`dist`), or let Vercel use the checked-in `vercel.json`.
3. Add `VITE_API_URL` to the Vercel project's environment variables. Set it to the deployed backend base URL, including `https://` and without an `/api` suffix. Apply it to the Production environment (and Preview if previews should use the API).
4. Deploy the backend and set its `CORS_ALLOWED_ORIGINS` environment variable to the exact Vercel site origin, for example `https://your-project.vercel.app`. Separate multiple allowed origins with commas. For preview deployments, add the exact preview origins you want to allow.
5. Redeploy after changing environment variables.

`VITE_API_URL` is bundled into browser code and must only contain the public API URL. Never put Supabase keys or other secrets in frontend environment variables; configure those on the backend.
