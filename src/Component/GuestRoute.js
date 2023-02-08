import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../store/auth";

function GuestRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  return isAuth
    ? <Navigate to="/" />
    : <Route {...props} />;
}

export default GuestRoute;