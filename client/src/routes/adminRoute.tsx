import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

// Props interface for AdminRoute wrapper component
interface AdminRouteProps {
  children: ReactNode;
}

// Route guard - only allows admin users, redirects others to error page
export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Wait for authentication check to complete before making redirect decision
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Redirect to error page if not authenticated or not admin
  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/erreur" replace />;
  }

  // User is admin - render the admin page
  return <>{children}</>;
}
