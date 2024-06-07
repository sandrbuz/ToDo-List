import React, { useState, KeyboardEvent } from 'react';
import TaskItem from './TaskItem/TaskItem';
import './App.css';
import TaskControls from './TaskControls/TaskControls';


interface Task {
  text: string;
  isActive: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Тестовое задание", isActive: true },
    { text: "Прекрасный код", isActive: false },
    { text: "Покрытие тестами", isActive: true },
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

  return (
    <div className='main'>
      <h1>TODOS</h1>
      <div className='app'>
        {newTask.length >= 20 && <span className="validation">max 20</span>}
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleAddTask}
          placeholder="Add a new task"
          maxLength={20}
          className="addTask"
        />
        <ul>
          {getFilteredTasks().map((task, index) => (
            <TaskItem key={index} task={task} onToggle={() => toggleTask(index)} />
          ))}
        </ul>
        <TaskControls
          activeTaskCount={activeTaskCount}
          currentFilter={filter}
          setFilter={setFilter}
          deleteCompletedTasks={deleteCompletedTasks}
        />
      </div>
    </div>
  );
};

export default App;
