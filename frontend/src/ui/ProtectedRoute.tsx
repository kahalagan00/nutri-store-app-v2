import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/home",
  children,
}: {
  isAuthenticated: null | boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <div>{children}</div> : <Outlet />;
};

export default ProtectedRoute;
