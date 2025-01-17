import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    const editedText = prompt('Edit your task:', tasks[index].text);
    if (editedText !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editedText;
      setTasks(updatedTasks);
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-4">Create your Todo-List</h1>
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What are your tasks for today?"
            className="flex-grow p-2 rounded-xl bg-transparent border-2 border-lime-100"
          />
          <button
            onClick={addTask}
            className="bg-transparent px-4 py-2 rounded-xl border-2 border-lime-100 text-white font-bold"
          >
            Add
          </button>
        </div>
        <ul className='mt-10'>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center mb-2 p-2 rounded-xl ${
                task.completed ? 'line-through text-gray-500' : ''
              } bg-transparent border-2 border-amber-200 font-sans text-gray-300`}
            >
              <span>{task.text}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTask(index)}
                  className="px-2 py-1 text-sm font-bold text-green-900"
                >
                  EDIT
                </button>
                <button
                  onClick={() => toggleComplete(index)}
                  className="px-2 py-1 text-sm font-bold text-amber-600"
                >
                  COMPLETED
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="px-2 py-1 text-sm font-bold text-red-900"
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
