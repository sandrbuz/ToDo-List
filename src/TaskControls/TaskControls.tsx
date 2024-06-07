import React from 'react';
import styles from './TaskControls.module.css';

interface TaskControlsProps {
  activeTaskCount: number;
  currentFilter: string;
  setFilter: (filter: string) => void;
  deleteCompletedTasks: () => void;
}

const TaskControls: React.FC<TaskControlsProps> = ({
  activeTaskCount,
  currentFilter,
  setFilter,
  deleteCompletedTasks
}) => {
  const getButtonStyle = (buttonFilter: string) => {
    return {
      border: currentFilter === buttonFilter ? '1px solid grey' : 'none'
    };
  };

  return (
    <div className={styles.taskControls}>
      <p className={styles.taskCount}>{activeTaskCount} items left</p>
      <button style={getButtonStyle('all')} onClick={() => setFilter('all')}>All</button>
      <button style={getButtonStyle('active')} onClick={() => setFilter('active')}>Active</button>
      <button style={getButtonStyle('completed')} onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={deleteCompletedTasks}>Clear completed</button>
    </div>
  );
};

export default TaskControls;
