"use client"
import React from 'react';
import { TodoProvider, useTodos } from '../state/TodoContext'; // 导入TodoProvider
import PomodoroTimer from '../component/PomodoroTimer'; // 导入其他需要的组件
import TodoInput from '../component/TodoInput';
import TaskDetail from '../component/TaskDetail';
import TodoItem from '../component/TodoItem';
import Navbar from '../component/Navbar.js';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Navbar/>
      <div>
        < TodoInput/>
      </div>
      <TodoProvider>
      <div className="App">
      
        {/* 应用的其他部分 */}
        <PomodoroTimer />
        {/* 你可以在这里放入更多组件，它们都可以访问到TodoContext中的状态 */}
      </div>
    </TodoProvider>
    </main>
  );
}
