import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getCurrentUser, isLoggedIn } from "../features/auth/utils/auth.utils";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && getCurrentUser()?.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
