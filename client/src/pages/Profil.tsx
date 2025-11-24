import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { User } from "../../../server/src/modules/user/usersRepository";
import "../assets/styles/page-layout.css";

export default function Profil() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userString = sessionStorage.getItem("user");
        if (!userString) {
          setError("Utilisateur non connecté");
          return;
        }
        const user = JSON.parse(userString);
        const userId = user.id;

        const token = sessionStorage.getItem("jwt");
        if (!token) {
          setError("Session expirée");
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Erreur serveur: ${res.status}`);
        }

        const data = await res.json();

        // L'API retourne un tableau, prendre le premier élément
        const userDataFromAPI = Array.isArray(data) ? data[0] : data;

        if (!userDataFromAPI) {
          throw new Error("Utilisateur non trouvé");
        }

        setUserData(userDataFromAPI);
      } catch (err) {
        console.error("Erreur lors du fetch des utilisateurs:", err);
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsersData();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire et sauvegarder les modifications
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page

    setError(null);
    setSuccess(null);

    if (!userData) return;

    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        setError("Session expirée");
        navigate("/connexion");
        return;
      }

      // Appel API pour mettre à jour le profil
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email ?? userData.email,
            first_name: formData.first_name ?? userData.first_name,
            last_name: formData.last_name ?? userData.last_name,
            pseudo: formData.pseudo ?? userData.pseudo,
            zip_code: formData.zip_code ?? userData.zip_code,
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          setError("Session expirée");
          navigate("/connexion");
          return;
        }
        throw new Error(`Erreur ${res.status}`);
      }

      const updatedData = await res.json();

      // Mettre à jour les données locales
      setUserData({ ...userData, ...updatedData });

      // Mettre à jour le sessionStorage
      const currentUser = sessionStorage.getItem("user");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...updatedData })
        );
      }

      // Réinitialiser le formulaire
      setFormData({});
      setIsEditing(null);
      setSuccess("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      setError(
        err instanceof Error ? err.message : "Erreur lors de la mise à jour"
      );
    }
  };

  // État de chargement
  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <p className="page-text">Chargement...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error || !userData) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <p className="page-text">{error || "Erreur de chargement"}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h2 className="page-title">Mon Profil</h2>

        {/* Messages de succès et d'erreur */}
        {success && (
          <div
            className="page-text"
            style={{
              color: "#00ff00",
              textAlign: "center",
              marginBottom: "1rem",
            }}
            role="status"
            aria-live="polite"
          >
            ✓ {success}
          </div>
        )}
        {error && (
          <div
            className="page-text"
            style={{
              color: "#ff4444",
              textAlign: "center",
              marginBottom: "1rem",
            }}
            role="alert"
            aria-live="assertive"
          >
            ✗ {error}
          </div>
        )}

        {/* Section Identité */}
        <div className="page-section">
          {isEditing !== "identity" ? (
            <>
              <p className="page-text">Pseudo : {userData.pseudo}</p>
              <p className="page-text">Prénom : {userData.first_name}</p>
              <p className="page-text">Nom : {userData.last_name}</p>
              <p className="page-text">Email : {userData.email}</p>
              <p className="page-text">Code postal : {userData.zip_code}</p>

              <button
                className="button"
                onClick={() => setIsEditing("identity")}
              >
                Modifier
              </button>
            </>
          ) : (
            // Mode édition
            <form className="page-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="pseudo" className="form-label">
                  Pseudo *
                </label>
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  value={formData.pseudo ?? userData.pseudo}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name ?? userData.first_name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name" className="form-label">
                  Nom *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name ?? userData.last_name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email ?? userData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip_code" className="form-label">
                  Code postal *
                </label>
                <input
                  type="number"
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code ?? userData.zip_code}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  min="0"
                  max="99999"
                />
              </div>

              <button type="submit" className="button">
                Enregistrer
              </button>
              <button
                type="button"
                className="button"
                onClick={() => setIsEditing(null)}
              >
                Annuler
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
