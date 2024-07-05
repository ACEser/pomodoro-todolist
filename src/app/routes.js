import { Routes, Route } from "react-router-dom";
import Register from "./login/login.jsx";
import Login from "./login/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}
