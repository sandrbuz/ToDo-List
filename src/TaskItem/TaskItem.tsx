import React from 'react';
import styles from './TaskItem.module.css';

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
    <li className={styles.taskItem} style={{
      textDecoration: task.isActive ? 'none' : 'line-through',
      color: task.isActive ? 'inherit' : 'rgb(201, 199, 199)'
    }}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={!task.isActive}
          onChange={onToggle}
        />
        <span className={styles.checkboxCustom}></span>
      </label>
      <p>{task.text}</p>
    </li>
  );
}

export default TaskItem;
