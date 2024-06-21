import { Routes, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

function sidenavbar() {}
