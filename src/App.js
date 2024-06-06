import './App.css';
import React, { useState } from 'react';
import TaskItem from './TaskList/TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { text: "1 case", isActive: true },
    { text: "2 case", isActive: true },
    { text: "3 case", isActive: true },
    { text: "4 case", isActive: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');


  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, isActive: true }]);
      setNewTask('');
    }
  };


  const toggleTask = index => {
    const newTasks = tasks.map((task, taskIndex) => {
      if (index === taskIndex) {
        return { ...task, isActive: !task.isActive };
      }
      return task;
    });
    setTasks(newTasks);
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

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => task.isActive));
  };

  const activeTaskCount = tasks.filter(task => task.isActive).length;

  // Function to determine button style
  const getButtonStyle = (buttonFilter) => {
    return {
      border: filter === buttonFilter ? '2px solid black' : '1px solid grey'
    };
  };

  return (
    <div className='main'>
      <div className='app'>
        <h1>ToDo List</h1>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
        <ul>
          {getFilteredTasks().map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onToggle={() => toggleTask(index)}
            />
          ))}
        </ul>
        <div>
          <p>{activeTaskCount} item left</p>
          <button style={getButtonStyle('all')} onClick={() => setFilter('all')}>All</button>
          <button style={getButtonStyle('active')} onClick={() => setFilter('active')}>Active</button>
          <button style={getButtonStyle('completed')} onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={deleteCompletedTasks}>Delete Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
