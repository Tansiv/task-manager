import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api/tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1>Task Manager</h1>
      {error && <p className="error-message">{error}</p>}
      <TaskForm onAddTask={handleAddTask} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;