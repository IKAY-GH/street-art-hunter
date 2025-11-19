import { Navigate } from "react-router-dom";
import authService from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Composant qui protège les routes accessibles uniquement aux utilisateurs connectés
 * Redirige vers /connexion si l'utilisateur n'est pas authentifié
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }

  return <>{children}</>;
}
