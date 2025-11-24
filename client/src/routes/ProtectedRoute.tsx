import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Composant qui protège les routes accessibles uniquement aux utilisateurs connectés
 * Redirige vers /connexion si l'utilisateur n'est pas authentifié
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }
  return <>{children}</>;
}
