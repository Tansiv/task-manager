import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api/tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const completedTasks = tasks.filter((task) => task.status === 'Done').length;
  const activeTasks = tasks.filter((task) => task.status !== 'Done').length;
  const progressValue = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(loadTasks);
  }, []);

  async function handleAddTask(newTask) {
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [created, ...prev]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not add task.');
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      const updated = await updateTaskStatus(id, newStatus);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not update task status.');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not delete task.');
    }
  }

  return (
    <div className="app">
      <header className="app-hero">
        <div className="app-hero__copy">
          <p className="eyebrow">Operations dashboard</p>
          <h1>Task Manager</h1>
          <p className="hero-subtitle">
            Track priorities, update progress, and keep delivery moving from one focused workspace.
          </p>
        </div>

        <div className="hero-summary">
          <div className="summary-card">
            <span className="summary-label">Total tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="summary-card">
            <span className="summary-label">In progress</span>
            <strong>{activeTasks}</strong>
          </div>
          <div className="summary-card summary-card--accent">
            <span className="summary-label">Completed</span>
            <strong>{completedTasks}</strong>
            <span className="summary-footnote">{progressValue}% done</span>
          </div>
        </div>
      </header>

      <section className="dashboard-grid">
        <div className="panel panel--form">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Add work</p>
              <h2>Create task</h2>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="panel panel--list">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Task board</p>
              <h2>Current tasks</h2>
            </div>
            <div className="panel-meta">{tasks.length} item{tasks.length === 1 ? '' : 's'}</div>
          </div>
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
