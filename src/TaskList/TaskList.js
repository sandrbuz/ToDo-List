import React from 'react';

function TaskItem({ task, onToggle }) {
  return (
    <li style={{ textDecoration: task.isActive ? 'none' : 'line-through' }}>
      <input
        type="checkbox"
        checked={!task.isActive}
        onChange={onToggle}
      />
      {task.text}
    </li>
  );
}

export default TaskItem;