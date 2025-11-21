import { useAuth } from "../context/AuthContext";
import "./userProfile.css";

export default function UserProfile() {
  const { logout } = useAuth(); // On retire isAuthenticated, on n'en a pas besoin ici

  // Récupérer les informations utilisateur depuis sessionStorage
  const userString = sessionStorage.getItem("user");
  console.log("📦 User string from storage:", userString);

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
    console.log("👤 User parsed:", user);
  } catch (error) {
    console.error("❌ Erreur parsing user:", error);
    sessionStorage.removeItem("user"); // Nettoyer les données corrompues
  }

  // Si pas d'utilisateur dans sessionStorage, ne rien afficher
  // On ne vérifie QUE user, pas isAuthenticated
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
