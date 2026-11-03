# Nexcent landing page

Responsive React landing page with an Express API. The API serves the page content, local images, and configured admin/manager login accounts. Login opens a small dashboard with the site's published statistics.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

Install dependencies from the project root:

```sh
npm install
npm install --prefix backend
npm install --prefix frontend
```

Create the backend environment file and set local login credentials:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env` and replace the example passwords and `JWT_SECRET`. The `.env` file is ignored by Git; never commit real secrets.

Start both apps from the project root:

```sh
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`
- Login: `http://localhost:5173/#login`

Build the frontend with `npm run build`. Start the API in production with `npm start --prefix backend`.

## Deployment configuration

This repository includes `render.yaml` for a single Render Web Service that serves both the built React site and the Express API. In Render, create a Blueprint from this GitHub repository and enter the admin/manager credentials when prompted. Render generates `JWT_SECRET` automatically. Frontend dev dependencies are explicitly installed during build because Vite is needed to produce the production bundle. The configured free plan sleeps after 15 minutes without traffic, so the first request after idle can take longer.

For a manual Render setup, use this build command so Vite is installed even when `NODE_ENV=production` is set:

```sh
npm ci && npm ci --prefix backend && npm ci --include=dev --prefix frontend && npm run build
```

Configure these environment variables:

- `PORT`: supplied by most hosting providers.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: admin account credentials.
- `MANAGER_EMAIL` and `MANAGER_PASSWORD`: manager account credentials.
- `JWT_SECRET`: a private, randomly generated signing key.
- `CORS_ORIGIN`: exact frontend origin, such as `https://example.com`.

The Blueprint serves the frontend and API from the same domain, so no `VITE_API_BASE_URL` value is needed. If you later split them across domains, set `VITE_API_BASE_URL` to the backend origin when building the frontend and set `CORS_ORIGIN` to the exact frontend origin. This variable is public in the built site; never put secrets in `VITE_*` variables. Serve the deployed site over HTTPS.

The site content and image assets are currently stored in `backend/src/data/homepage.js` and `backend/public/`. Login uses the configured environment accounts; user registration and a database are not included.

## Deploy to Vercel

Import the repository with the Vercel project root set to the repository root (leave **Root Directory** as `.`) and select the **Services** application preset. `vercel.json` defines separate Vite and Express services and routes `/api/*` and `/assets/*` to the backend, with other requests going to the frontend. Vercel Services must be enabled for the account/project.

Set these Production environment variables in Vercel before deploying:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET` (use a long, randomly generated value)
- `MANAGER_EMAIL` and `MANAGER_PASSWORD` (optional)

The frontend and API use the same Vercel domain, so `VITE_API_BASE_URL` and `CORS_ORIGIN` are not needed. If you configure a custom domain, it works on the same origin too. If the frontend and API are later hosted on separate domains, configure `VITE_API_BASE_URL` at build time and set `CORS_ORIGIN` to the frontend's exact origin.
