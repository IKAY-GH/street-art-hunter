import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Attendre que le chargement soit terminé
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si pas connecté ou pas admin, rediriger vers la page d'erreur
  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/erreur" replace />;
  }

  return <>{children}</>;
}
