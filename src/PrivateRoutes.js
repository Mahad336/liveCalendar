import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PrivateRoutes() {
  const [cookies, setCookie] = useCookies();

  const requireAuth = cookies.jwt;
  return requireAuth ? <Outlet /> : <Navigate to="/form" />;
}
