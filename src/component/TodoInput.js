import React, { useState } from 'react';
import { useTodos } from '../state/TodoContext';
import {createTask } from '../api/api.js'

function TodoInput({ addTask }) {
  const [taskContent, setTaskContent] = useState('');

  const handleInputChange = (e) => {
    createTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    addTask(taskContent);
    setTaskContent('');
  };
  return (
    <div>
    <label
      htmlFor="taskContent"
      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="text"
        id="taskContent"
        placeholder="待办内容"
        onChange={handleInputChange} 
        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />

      <span
        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
      >
        待办内容
      </span>
    </label>
      <button type="submit">Create</button>
    </div>
  );
}
export default TodoInput;