// Configuration de base
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

// Fonction générique pour appeler l'API
async function callAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  // Récupérer le token du localStorage
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Ajouter le token si présent
        ...options.headers,
      },
      ...options,
    });

    // Si la réponse n'est pas OK, lancer une erreur
    if (!response.ok) {
      // Si 401 (non autorisé), déconnecter l'utilisateur
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/connexion";
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    // Retourner les données JSON
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

// Fonctions simplifiées pour chaque méthode HTTP
export const api = {
  // GET - Récupérer des données
  get: (endpoint: string) => {
    return callAPI(endpoint, { method: "GET" });
  },

  // POST - Envoyer des données
  post: (endpoint: string, data: any) => {
    return callAPI(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT - Mettre à jour
  put: (endpoint: string, data: any) => {
    return callAPI(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE - Supprimer
  delete: (endpoint: string) => {
    return callAPI(endpoint, { method: "DELETE" });
  },
};
