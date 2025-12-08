import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import "./userProfile.css";

/**
 * User profile component - displays current user info and logout button
 * Shows user's pseudo and provides a logout action
 */
export default function UserProfile() {
  const { logout } = useAuth();

  // Retrieve current authenticated user from session storage
  const user = authService.getCurrentUser();

  // Don't render if no user is authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <p>Bonjour {user.pseudo} !</p>
      <button type="button" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
}
