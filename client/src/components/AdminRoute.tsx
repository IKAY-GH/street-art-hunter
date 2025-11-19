import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import authService from "../services/authService";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Composant qui protège les routes accessibles uniquement aux administrateurs
 * Redirige vers /connexion si l'utilisateur n'est pas connecté
 * Redirige vers / si l'utilisateur est connecté mais n'est pas admin
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  // Vérifier si l'utilisateur est connecté
  if (!authService.isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }

  // Vérifier si l'utilisateur est admin
  if (!authService.isAdmin()) {
    // Afficher un message d'alerte avant la redirection
    useEffect(() => {
      alert("⛔ Accès refusé : Cette page est réservée aux administrateurs.");
    }, []);

    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
