# Membership landing page API

Backend API for the landing-page sections shown in the supplied design references. The content is currently served from `src/data/homepage.js`, so the frontend can integrate without waiting for a database or admin panel. Replace the sample client logos, article images, social URLs, and metrics with approved production content.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy the environment template with `Copy-Item .env.example .env`.

The login page is available at `http://localhost:5173/#login`. After login, the user sees a dashboard with the site's published statistics; the session is checked again when the page reloads. Configure admin and manager accounts with `ADMIN_EMAIL` / `ADMIN_PASSWORD` and `MANAGER_EMAIL` / `MANAGER_PASSWORD` in `backend/.env`. Set a private random `JWT_SECRET` there before using this outside your own computer. User registration and a database are not part of this first version.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Service health |
| POST | `/api/auth/login` | Verify the configured admin account and issue an 8-hour JWT |
| GET | `/api/auth/me` | Validate the current Bearer token |
| GET | `/api/homepage` | All landing-page content |
| GET | `/api/homepage/clients` | Client logo strip |
| GET | `/api/homepage/audiences` | Membership audience cards |
| GET | `/api/homepage/stats` | Membership statistics |
| GET | `/api/homepage/articles` | Blog/article cards |
| GET | `/api/homepage/social-links` | Footer social links |

Responses use `{ "data": ... }`. Configure `CORS_ORIGIN` as a comma-separated list of exact frontend origins before deployment. No database is needed for this read-only marketing content; if the content needs editing through an admin panel later, these data objects can move to PostgreSQL without changing the response shape.
