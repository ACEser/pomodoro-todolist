import React, { createContext, useReducer, useContext } from 'react';

// 初始状态
const initialState = {
  todos: [],
  currentTodo: null,
};

// 定义一个简单的reducer函数来处理action
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'SET_CURRENT_TODO':
      return { ...state, currentTodo: action.payload };
    default:
      return state;
  }
};

// 创建Context
const TodoContext = createContext();

// 导出Provider组件，这将允许其他组件使用我们的Context
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// 自定义hook使访问context更方便
export const useTodos = () => useContext(TodoContext);