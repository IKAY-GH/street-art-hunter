import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import "./userProfile.css";

export default function UserProfile() {
  const { logout } = useAuth();

  const user = authService.getCurrentUser();

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
