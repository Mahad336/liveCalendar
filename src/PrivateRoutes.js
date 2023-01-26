import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PrivateRoutes() {
  const requireAuth = localStorage.getItem("email");
  return requireAuth ? <Outlet /> : <Navigate to="/form" />;
}
