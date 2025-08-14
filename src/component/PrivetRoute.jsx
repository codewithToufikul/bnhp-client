import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivetRoute = ({ children }) => {
  const { user, userLoading } = useAuth();
  if (userLoading) {
    return <p>Loading..</p>;
  }
  if (!user) {
    return <Navigate to="/dashboard-login" replace />;
  }
  return children;
};

export default PrivetRoute;
