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
      <button type="submit">Create</button>
    </form>
  );
}

export default TodoInput;