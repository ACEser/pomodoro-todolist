"use client"
import React from 'react';
import { BrowserRouter as Router, Route, Link, UNSAFE_DataRouterStateContext } from 'react-router-dom';
import login  from './login';


import { TodoProvider, useTodos } from '../state/TodoContext'; // 导入TodoProvider
import PomodoroTimer from '../component/PomodoroTimer'; // 导入其他需要的组件
import TodoInput from '../component/TodoInput';
import TaskDetail from '../component/TaskDetail';
import TodoItem from '../component/TodoItem';
import Navbar from '../component/Navbar.js';
export default function APP() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a>
        <Router path="/" exact component={login} />
      </a>
    </main>
  );
}
