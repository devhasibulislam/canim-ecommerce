import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import FullScreenLoading from "../components/loading/FullScreenLoading";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!isLoading && !Object.keys(user).length) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
