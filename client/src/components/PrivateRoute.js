import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authed = localStorage.getItem("myToken");
  return authed ? (
    children
  ) : (
    <>
      {alert("You need to Login first, before accessing this Route")}
      <Navigate to="/" />;
    </>
  );
};

export default PrivateRoute;
