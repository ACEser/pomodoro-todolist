"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './store'; // 确保你已经定义了 store
import Login from './Login';
import Logout from './Logout';
import Todo from './Todo';
import Habit from './Habit';
import PomodoroTimer from './Pomodoro';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import { loginSuccess, logout } from './authReducer'; // 确保你已经定义了这些 actions

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/todo" element={<PrivateRoute component={Todo} />} />
            <Route path="/habit" element={<PrivateRoute component={Habit} />} />
            <Route path="/pomodoro" element={<PrivateRoute component={PomodoroTimer} />} />
            <Route path="*" exact element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;

