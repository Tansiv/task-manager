import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      setFormError('Title cannot be empty.');
      return;
    }

    if (trimmedTitle.length > 150) {
      setFormError('Title must be under 150 characters.');
      return;
    }

    setFormError('');
    onAddTask({ title: trimmedTitle, description: description.trim(), status: 'To Do' });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {formError && <p className="form-error">{formError}</p>}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;