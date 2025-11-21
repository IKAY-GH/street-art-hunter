import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/erreur" replace />;
  }

  return <>{children}</>;
}
