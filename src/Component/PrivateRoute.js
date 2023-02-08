import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../store/auth";

function PrivateRoute() {
  const isAuth = useSelector(isAuthSelector);
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;