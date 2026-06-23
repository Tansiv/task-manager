const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error fetching tasks' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (title.trim().length > 150) {
    return res.status(400).json({ error: 'Title must be under 150 characters' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, status || 'To Do']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error creating task' });
  }
});

// PATCH update task status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['To Do', 'In Progress', 'Done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error updating task' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted', task: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error deleting task' });
  }
});

module.exports = router;