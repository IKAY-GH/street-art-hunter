import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import authService from "../services/authService";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }

  if (!authService.isAdmin()) {
    useEffect(() => {
      alert("⛔ Accès refusé : Cette page est réservée aux administrateurs.");
    }, []);

    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
