const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

async function callAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  const token = sessionStorage.getItem("jwt");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("user");
        window.location.href = "/connexion";
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

export const api = {
  get: (endpoint: string) => {
    return callAPI(endpoint, { method: "GET" });
  },

  post: (endpoint: string, data: any) => {
    return callAPI(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put: (endpoint: string, data: any) => {
    return callAPI(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (endpoint: string) => {
    return callAPI(endpoint, { method: "DELETE" });
  },
};
