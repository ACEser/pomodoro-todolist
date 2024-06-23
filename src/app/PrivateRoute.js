// PrivateRoute.js
import React from "react";
import { Route } from "react-router-dom";
import withAuth from "./withAuth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} element={<Component />} />
);

export default withAuth(PrivateRoute);
