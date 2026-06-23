function TaskItem({ task, onStatusChange, onDelete }) {
  const handleDeleteClick = () => {
    const confirmed = window.confirm(`Delete "${task.title}"? This cannot be undone.`);
    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <div className="task-item">
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description || 'No description'}</p>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;