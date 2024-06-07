import React, { useState, KeyboardEvent } from 'react';
import TaskItem from './TaskItem/TaskItem';
import './App.css';


interface Task {
  text: string;
  isActive: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "1 case", isActive: true },
    { text: "2 case", isActive: false },
    { text: "3 case", isActive: true },
  ]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTask && e.key === 'Enter') {
      setTasks([...tasks, { text: newTask, isActive: true }]);
      setNewTask('');
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = tasks.map((task, taskIndex) => {
      if (index === taskIndex) {
        return { ...task, isActive: !task.isActive };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => task.isActive));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => task.isActive);
      case 'completed':
        return tasks.filter(task => !task.isActive);
      default:
        return tasks;
    }
  };

  // Calculate the number of active tasks
  const activeTaskCount = tasks.filter(task => task.isActive).length;

  const getButtonStyle = (buttonFilter: string) => {
    return {
      border: filter === buttonFilter ? '2px solid black' : '1px solid grey'
    };
  };

  const inputStyle = {
    outline: newTask.length === 20 ? '2px solid red' : 'none'
  };

  return (
    <div className='main'>
      <h1>TODOS</h1>
      <div className='app'>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleAddTask}
          placeholder="Add a new task"
          maxLength={20}
        // style={inputStyle}
        />
        <ul>
          {getFilteredTasks().map((task, index) => (
            <TaskItem key={index} task={task} onToggle={() => toggleTask(index)} />
          ))}
        </ul>
        <div>
          <p>{activeTaskCount} items left</p>
          <button style={getButtonStyle('all')} onClick={() => setFilter('all')}>All</button>
          <button style={getButtonStyle('active')} onClick={() => setFilter('active')}>Active</button>
          <button style={getButtonStyle('completed')} onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={deleteCompletedTasks}>Delete Completed</button>
        </div>

      </div>
    </div>
  );
};

export default App;
