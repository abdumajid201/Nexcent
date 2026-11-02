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

Configure these environment variables on the backend host:

- `PORT`: supplied by most hosting providers.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: admin account credentials.
- `MANAGER_EMAIL` and `MANAGER_PASSWORD`: manager account credentials.
- `JWT_SECRET`: a private, randomly generated signing key.
- `CORS_ORIGIN`: exact frontend origin, such as `https://example.com`.

If frontend and backend use different domains, set `VITE_API_BASE_URL` to the backend origin when building the frontend. This variable is public in the built site; never put secrets in `VITE_*` variables. Serve the deployed site over HTTPS.

The site content and image assets are currently stored in `backend/src/data/homepage.js` and `backend/public/`. Login uses the configured environment accounts; user registration and a database are not included.
