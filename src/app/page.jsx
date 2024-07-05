"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './global/store'; // 确保你已经定义了 store
import Login from './login/login';
import Register from './login/Register';
import Logout from './Logout';
import Todo from './components/Todo';
import Habit from './components/Habit';
import PomodoroTimer from './Pomodoro';
import PrivateRoute from './global/PrivateRoute';
import Layout from './Layout';

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
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;