import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import useAuth from "../features/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { currentUser, isLoggedIn, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && currentUser?.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
