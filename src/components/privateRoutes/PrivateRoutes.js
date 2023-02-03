import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getEmailToken } from "../../utils/handleToken";

export default function PrivateRoutes() {
  const requireAuth = getEmailToken();

  return requireAuth ? <Outlet /> : <Navigate to="/form" />;
}
