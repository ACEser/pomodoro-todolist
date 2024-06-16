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