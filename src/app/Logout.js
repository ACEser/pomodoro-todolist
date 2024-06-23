// components/Logout.js
import React from "react";
import { useDispatch } from "react-redux";
import authReducer from "./authReducer";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwtToken");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
