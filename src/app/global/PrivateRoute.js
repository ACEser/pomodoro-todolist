import React from "react";
import { Route, Navigate } from "react-router-dom";
import withAuth from "./withAuth";
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Component /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default withAuth(PrivateRoute);
