import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title) return;
    
    await axios.post('http://localhost:5000/tasks', {
      title,
      description,
      completed: false
    });
    
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      completed: !currentStatus
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo description"
        />
        <button className='glow-on-hover' onClick={addTask}>Todo</button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <button className="Mark-as-complete" onClick={() => toggleComplete(task.id, task.completed)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button className='delete-task' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;