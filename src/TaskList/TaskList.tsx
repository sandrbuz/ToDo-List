import React from 'react';

// Define the interface for the task object
interface Task {
  text: string;
  isActive: boolean;
}

// Define the interface for the component props
interface TaskItemProps {
  task: Task;
  onToggle: () => void;  // Define the type of the onToggle function
}

// Apply the interface to the function component
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
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
