import TaskItem from './TaskItem';

function TaskList({ tasks, onStatusChange, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;