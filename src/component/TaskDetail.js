import React, { useState } from 'react';

function TaskDetail({ task, updateTask, closeDetail }) {
  const { taskId, content } = task;
  const [newContent, setNewContent] = useState(content);

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(taskId, newContent);
    closeDetail();
  };

  return (
    <div className="task-detail">
      <form onSubmit={handleSubmit}>
        <textarea value={newContent} onChange={handleContentChange} />
        <button type="submit">Update</button>
        <button type="button" onClick={closeDetail}>Close</button>
      </form>
    </div>
  );
}

export default TaskDetail;