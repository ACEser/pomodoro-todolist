import React, { useState } from 'react';

function TodoInput({ addTask }) {
  const [taskContent, setTaskContent] = useState('');

  const handleInputChange = (e) => {
    setTaskContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    addTask(taskContent);
    setTaskContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={taskContent} onChange={handleInputChange} placeholder="Add new task..." />
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

  <div>
    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> 待办内容 </label>

    <input
      type="text"
      id="UserEmail"
      placeholder="john@rhcp.com"
      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
    />
  </div>
      <button type="submit">Create</button>
    </form>
  );
}

export default TodoInput;