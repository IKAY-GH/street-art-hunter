import { api } from "./api";

// Types
export type RegisterData = {
  pseudo: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  zip_code: number;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    pseudo: string;
    email: string;
    role: "user" | "admin";
  };
}

// Service d'authentification
const authService = {
  // Inscription
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/api/users/inscription", data);

    // Stocker le token et les infos user dans sessionStorage
    // La session expire à la fermeture du navigateur
    sessionStorage.setItem("jwt", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user));

    return response;
  },

  // Connexion
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/api/users/login", data);

    // Stocker le token et les infos user dans sessionStorage
    // La session expire à la fermeture du navigateur
    sessionStorage.setItem("jwt", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user));

    return response;
  },

  // Déconnexion
  logout(): void {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    window.location.href = "/connexion";
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("jwt");
  },

  // Récupérer le token
  getToken(): string | null {
    return sessionStorage.getItem("jwt");
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser(): AuthResponse["user"] | null {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "admin";
  },
};

export default authService;
