# Task Manager

<p align="center">
  <img src="frontend/public/Dashboard.png" alt="Task Manager dashboard preview" width="100%" />
</p>

<p align="center">
  A full-stack task management dashboard built with React, Vite, Express, and PostgreSQL — deployed end to end with a live frontend, live backend API, and a cloud-hosted database.
</p>

<p align="center">
  <strong>Frontend:</strong> React 19 + Vite |
  <strong>Backend:</strong> Node.js + Express |
  <strong>Database:</strong> PostgreSQL (Neon)
</p>

<p align="center">
  <a href="https://task-manager-ocvpl4ml8-tansiv-jubayer-s-projects.vercel.app/"><strong>🚀 Live Demo</strong></a> ·
  <a href="https://task-manager-backend-kviy.onrender.com/api/tasks"><strong>🔌 Live API</strong></a>
</p>

---

## 🌐 Try It Right Now

| | |
| --- | --- |
| **App** | **[task-manager-ocvpl4ml8-tansiv-jubayer-s-projects.vercel.app](https://task-manager-ocvpl4ml8-tansiv-jubayer-s-projects.vercel.app/)** |
| **Raw API** | **[task-manager-backend-kviy.onrender.com/api/tasks](https://task-manager-backend-kviy.onrender.com/api/tasks)** |
| **Database** | PostgreSQL on Neon (private, accessed only through the API) |

Open the app link, add a task, change its status, delete it — then open the raw API link in another tab and watch the exact same data sitting there as JSON. That round trip, browser → React → Express → PostgreSQL → back to your screen, is the entire project in one click.

> ⏳ **Heads up:** the backend sleeps after ~15 minutes of no traffic (Render free tier). If the app feels stuck loading on your first visit, give it 30–60 seconds — it's waking up the server, not broken. Every request after that is instant.

---

## Overview

Task Manager is a CRUD dashboard for organizing work, tracking status, and keeping priorities visible at a glance. It started as a take-home assignment and was built out into a fully deployed three-tier application: a React frontend, an Express REST API, and a PostgreSQL database, each hosted on a separate platform and wired together over HTTPS.

### What makes it stand out

- Professional dashboard layout with summary cards and a structured task board
- Task creation form with both client-side and server-side validation
- Status updates for `To Do`, `In Progress`, and `Done`, enforced at the database level via a `CHECK` constraint
- Delete confirmation to prevent accidental removals
- REST API backed by real PostgreSQL persistence — no hardcoded or mock data anywhere in the app
- Centralized API layer on the frontend (`src/api/tasks.js`) separating data-fetching logic from UI components
- Loading and error states on the frontend so backend downtime or slow cold starts never produce a blank or broken screen
- Responsive design that works across desktop and mobile layouts
- Fully deployed: independent frontend, backend, and database services communicating over the public internet

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, JavaScript |
| Styling | Custom CSS with responsive layout and dashboard visuals |
| Backend | Node.js, Express |
| Database | PostgreSQL (hosted on Neon) |
| API Style | REST |
| Hosting | Vercel (frontend), Render (backend), Neon (database) |

---

## Architecture

```text
Browser (React, hosted on Vercel)
        │  fetch() — HTTPS / JSON
        ▼
Express REST API (hosted on Render)
        │  parameterized SQL queries (pg)
        ▼
PostgreSQL database (hosted on Neon)
```

Each layer is an independently deployed service. The frontend has no direct database access — every read or write goes through the Express API, which is the only component holding database credentials.

---

## Features

- Create a task with a title and optional description
- Update task status directly from the list
- Delete tasks with confirmation
- View live task counts and completion progress in the dashboard header
- Persist all data in PostgreSQL
- Graceful handling of empty states, validation errors, and backend connectivity issues

---

## Project Structure

```text
task-manager/
├─ backend/
│  ├─ db.js
│  ├─ routes/
│  │  └─ tasks.js
│  ├─ schema.sql
│  ├─ server.js
│  ├─ .env                 (local only — not committed)
│  └─ package.json
├─ frontend/
│  ├─ public/
│  │  └─ Dashboard.png
│  ├─ src/
│  │  ├─ api/tasks.js
│  │  ├─ components/
│  │  │  ├─ TaskForm.jsx
│  │  │  ├─ TaskItem.jsx
│  │  │  └─ TaskList.jsx
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

---

## Running Locally

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL running locally (or a Neon connection string)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
PORT=5000
```

Create the database table (against a local Postgres instance):

```bash
psql -U your_db_user -d your_database_name -f schema.sql
```

Start the backend:

```bash
npm run dev
```

API runs at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal, usually `http://localhost:5173`.

By default, `frontend/src/api/tasks.js` points to the deployed Render URL. To run fully locally, change `BASE_URL` in that file to `http://localhost:5000/api/tasks`.

---

## Deployment Notes

This project is deployed as three independent services:

1. **Database (Neon)** — PostgreSQL instance created via Neon's dashboard; schema applied through Neon's SQL Editor using `schema.sql`.
2. **Backend (Render)** — live at [`task-manager-backend-kviy.onrender.com`](https://task-manager-backend-kviy.onrender.com/api/tasks), deployed as a Web Service with Root Directory set to `backend`, Build Command `npm install`, Start Command `node server.js`, and a `DATABASE_URL` environment variable pointing to the Neon connection string with `ssl: { rejectUnauthorized: false }` configured in `db.js`.
3. **Frontend (Vercel)** — live at [`task-manager-ocvpl4ml8-tansiv-jubayer-s-projects.vercel.app`](https://task-manager-ocvpl4ml8-tansiv-jubayer-s-projects.vercel.app/), deployed with Root Directory set to `frontend`, Framework Preset `Vite`, with `BASE_URL` in `src/api/tasks.js` pointing to the live Render backend URL above.

Each service redeploys automatically on every push to `main`.

---

## API Reference

Base URL (live):

```text
https://task-manager-backend-kviy.onrender.com/api/tasks
```

### Get all tasks

```http
GET /api/tasks
```

Returns every task, ordered newest first.

### Create a task

```http
POST /api/tasks
```

Request body:

```json
{
  "title": "Write README",
  "description": "Add a clear project README",
  "status": "To Do"
}
```

Validation: `title` is required, must be a string, and must be 150 characters or fewer.

### Update task status

```http
PATCH /api/tasks/:id
```

Request body:

```json
{
  "status": "In Progress"
}
```

Valid status values: `To Do`, `In Progress`, `Done`.

### Delete a task

```http
DELETE /api/tasks/:id
```

---

## Data Model

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'To Do'
        CHECK (status IN ('To Do', 'In Progress', 'Done')),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Validation rules

- `title` is required and must be a non-empty string
- `title` must be 150 characters or fewer
- `description` is optional
- `status` must be one of the three supported values — enforced both in the Express route and at the database level via `CHECK`

---

## Scripts

### Backend

- `npm run dev` — start the backend with `nodemon` (auto-restart on save)
- `npm start` — start the backend with plain Node (used in production)

### Frontend

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally

---

## Implementation Notes

- The frontend talks to the backend through a small fetch-based API layer in `frontend/src/api/tasks.js`, keeping HTTP logic separate from UI components
- The backend exposes a REST API in `backend/routes/tasks.js` using parameterized SQL queries throughout to prevent SQL injection
- `db.js` connects via a single `DATABASE_URL` connection string (rather than individual host/user/password variables), matching the format provided by managed Postgres hosts like Neon
- Styling is custom CSS, kept lightweight and dependency-free
- The dashboard header surfaces live task counts and completion progress, computed from real fetched data

---

## Future Enhancements

- Task filtering and search
- Due dates and reminders
- Priority levels and labels
- Drag-and-drop task ordering
- Authentication and multi-user support
- Automated tests for API routes

---

## License

This project is free to use and modify.