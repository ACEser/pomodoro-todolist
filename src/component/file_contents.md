

## File: .\PomodoroTimer.js

```text
import React, { useState, useEffect } from 'react';
import { useTodos } from '../state/TodoContext';

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 默认25分钟转化为秒
  const [isActive, setIsActive] = useState(false); // 计时器是否活跃/运行

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      alert("时间已经结束！"); // 简单示例，实际中可用更友好的通知方式替代
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  function toggleTimer() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setIsActive(false);
    setSecondsLeft(25 * 60); // 重置为25分钟
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }

  return (
    <div className="pomodoro-timer">
      <div className="timer-display">
        {formatTime(secondsLeft)}
      </div>
      <div className="timer-controls">
        <button className="start-pause" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
```

## File: .\TaskDetail.js

```text
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
```

## File: .\TodoInput.js

```text
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
```

## File: .\TodoItem.js

```text
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
```

## File: .\TodoList.js

```text
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, deleteTask, toggleComplete, showDetail }) {
  return (
    <div>
      {tasks.map(task => (
        <TodoItem
          key={task.taskId}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          showDetail={showDetail}
        />
      ))}
    </div>
  );
}

export default TodoList;
```

