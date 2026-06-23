# Task Manager

![Task Manager GIF](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

A clean and modern task management app with a React + Vite frontend and a Node.js + Express backend. This repository includes a PostgreSQL-powered API for creating, updating, and deleting tasks with a polished user interface.

---

## 🚀 Features

- Add new tasks with title and optional description
- Update task status between `To Do`, `In Progress`, and `Done`
- Delete tasks with confirmation
- Responsive UI built with React components
- REST API integration using Express and PostgreSQL
- Simple, maintainable file structure for frontend and backend

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, JavaScript |
| Backend | Node.js, Express, PostgreSQL |
| Database | PostgreSQL |
| API | REST |

---

## 📁 Project Structure

```text
backend/
  ├─ db.js
  ├─ routes/
  │   └─ tasks.js
  ├─ schema.sql
  ├─ server.js
  └─ package.json
frontend/
  ├─ public/
  ├─ src/
  │   ├─ api/tasks.js
  │   ├─ components/
  │   │   ├─ TaskForm.jsx
  │   │   ├─ TaskItem.jsx
  │   │   └─ TaskList.jsx
  │   ├─ App.css
  │   ├─ App.jsx
  │   └─ main.jsx
  ├─ package.json
  └─ vite.config.js
README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the database connection values:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
PORT=5000
```

Initialize the PostgreSQL schema:

```bash
psql -U your_db_user -d your_database_name -f schema.sql
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The app should be available at:

```text
http://localhost:5175
```

> By default, the frontend expects the backend API at `http://localhost:5000/api/tasks`.

---

## 🧪 API Endpoints

### Get all tasks
- `GET /api/tasks`

### Create a new task
- `POST /api/tasks`
- Body example:

```json
{
  "title": "Write README",
  "description": "Create a professional README for the app",
  "status": "To Do"
}
```

### Update a task status
- `PATCH /api/tasks/:id`
- Body example:

```json
{
  "status": "In Progress"
}
```

### Delete a task
- `DELETE /api/tasks/:id`

---

## ✅ Notes

- Task status is restricted to `To Do`, `In Progress`, and `Done`
- Titles are limited to 150 characters and cannot be empty
- The backend uses `created_at` timestamps for sorting tasks

---

## 📌 Scripts

### Backend
- `npm run dev` - start backend with `nodemon`
- `npm start` - start backend with Node.js

### Frontend
- `npm run dev` - start the frontend development server
- `npm run build` - build the production frontend bundle
- `npm run preview` - preview the production build

---

## 🤝 Contribution

Feel free to improve the UI, add authentication, or enhance task filtering and sorting.

---

## 📚 License

This project is free to use and modify.
