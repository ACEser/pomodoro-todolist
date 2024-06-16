import React from 'react';

function TodoItem({ task, deleteTask, toggleComplete, showDetail }) {
  const { taskId, content, isCompleted } = task;
  
  return (
    <div className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => toggleComplete(taskId)}
      />
      <span className="task-content">{content}</span>
      <button onClick={() => showDetail(taskId)}>Details</button>
      <button onClick={() => deleteTask(taskId)}>Delete</button>
    </div>
  );
}

export default TodoItem;