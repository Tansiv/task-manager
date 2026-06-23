# Task Manager

<p align="center">
  <img src="frontend/public/Dashboard.png" alt="Task Manager dashboard preview" width="100%" />
</p>

<p align="center">
  A polished full-stack task management dashboard built with React, Vite, Express, and PostgreSQL.
</p>

<p align="center">
  <strong>Frontend:</strong> React 19 + Vite |
  <strong>Backend:</strong> Node.js + Express |
  <strong>Database:</strong> PostgreSQL
</p>

---

## Overview

Task Manager is a modern CRUD dashboard for organizing work, tracking status, and keeping priorities visible at a glance.

It was designed as a portfolio-ready project with a clean UI, responsive layout, and a simple backend API that persists tasks in PostgreSQL.

### What makes it stand out

- Professional dashboard layout with summary cards and a structured task board
- Task creation form with validation and friendly error handling
- Status updates for `To Do`, `In Progress`, and `Done`
- Delete confirmation to prevent accidental removals
- REST API backed by PostgreSQL persistence
- Responsive design that works across desktop and mobile layouts

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, JavaScript |
| Styling | Custom CSS with responsive layout and dashboard visuals |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| API Style | REST |

---

## Features

- Create a task with a title and optional description
- Update task status directly from the list
- Delete tasks with confirmation
- View live task counts and completion progress in the dashboard header
- Persist all data in PostgreSQL
- Keep the UI clean, readable, and easy to scan

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

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or another Node package manager
- PostgreSQL running locally

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2. Set up the backend

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
PORT=5000
```

Create the database table:

```bash
psql -U your_db_user -d your_database_name -f schema.sql
```

Start the backend server:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the app in your browser at the Vite dev server URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## API Reference

Base URL:

```text
http://localhost:5000/api/tasks
```

### Get all tasks

```http
GET /api/tasks
```

Returns every task ordered by newest first.

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

Valid status values:

- `To Do`
- `In Progress`
- `Done`

### Delete a task

```http
DELETE /api/tasks/:id
```

---

## Data Model

The database uses a single `tasks` table:

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

- `title` is required
- `title` must be 150 characters or fewer
- `description` is optional
- `status` must be one of the supported values

---

## Scripts

### Backend

- `npm run dev` - start the backend with `nodemon`
- `npm start` - start the backend with Node.js

### Frontend

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

---

## Screenshots and Demo Assets

This project already includes a dashboard preview image in `frontend/public/Dashboard.png`.

If you want to make the repository feel even more portfolio-ready, you can add:

- a short demo GIF
- a hosted live demo link
- before/after UI screenshots
- a short feature walkthrough video

---

## Implementation Notes

- The frontend talks to the backend through a small fetch-based API layer in `frontend/src/api/tasks.js`
- The backend exposes a simple REST API in `backend/routes/tasks.js`
- Styling is custom CSS, which keeps the UI lightweight and easy to adapt
- The dashboard header now surfaces active counts and completion progress for a more professional feel

---

## Future Enhancements

Some strong next steps for this project would be:

- task filtering and search
- due dates and reminders
- priority levels and labels
- drag-and-drop task ordering
- authentication and multi-user support
- deployment to a cloud host

---

## License

This project is free to use and modify.
