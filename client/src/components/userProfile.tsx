import { useAuth } from "../context/AuthContext";
import "./userProfile.css";

export default function UserProfile() {
  const { logout } = useAuth();

  const userString = sessionStorage.getItem("user");
  console.log("📦 User string from storage:", userString);

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
    console.log("👤 User parsed:", user);
  } catch (error) {
    console.error("❌ Erreur parsing user:", error);
    sessionStorage.removeItem("user");
  }

  if (!user) {
    console.log("⚠️ Pas d'utilisateur, UserProfile caché");
    return null;
  }

  console.log("✅ UserProfile affiché pour:", user.pseudo);

  return (
    <div className="user-profile">
      <p>Bonjour {user.pseudo} !</p>
      <button type="button" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
}
