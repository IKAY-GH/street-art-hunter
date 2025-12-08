import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

// Props interface for ProtectedRoute wrapper component
interface ProtectedRouteProps {
  children: ReactNode;
}

// Route guard - redirects to login if user is not authenticated
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  // User is authenticated - render the protected page
  return <>{children}</>;
}
