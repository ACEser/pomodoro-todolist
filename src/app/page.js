"use client";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route,  Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './actions/authActions';
import Login from './components/Login';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';


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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      dispatch(loginSuccess(token));
    }

    // 设置自动登出
    const logoutTimer = setTimeout(() => {
      dispatch(logout());
      localStorage.removeItem('jwtToken');
    }, 3600000); // 1小时后自动登出

    return () => clearTimeout(logoutTimer);
  }, [dispatch]);

  return (
    <Router>
     <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/todo" component={Todo} isAuthenticated={isAuthenticated} />
        <PrivateRoute path="/habit" component={Habit} isAuthenticated={isAuthenticated} />
        <PrivateRoute path="/pomodoro" component={PomodoroTimer} isAuthenticated={isAuthenticated} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Router>
  );
}
