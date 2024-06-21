"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  UNSAFE_DataRouterStateContext,
} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";

import { TodoProvider, useTodos } from "../state/TodoContext"; // 导入TodoProvider
import PomodoroTimer from "../component/PomodoroTimer"; // 导入其他需要的组件
import TodoInput from "../component/TodoInput";
import TaskDetail from "../component/TaskDetail";
import TodoItem from "../component/TodoItem";
import Navbar from "../component/Navbar.js";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}
