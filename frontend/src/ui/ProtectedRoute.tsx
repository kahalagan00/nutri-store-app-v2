import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({
  isAuthenticated,
  requireAuth,
  redirectPath = "/home",
  children,
}: {
  isAuthenticated: null | boolean;
  requireAuth: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}) => {
  // Auth check still pending; don't redirect yet
  if (isAuthenticated === null) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated !== requireAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <div>{children}</div> : <Outlet />;
};

export default ProtectedRoute;
