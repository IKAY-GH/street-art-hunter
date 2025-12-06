const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3311";

export type RegisterData = {
  pseudo: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  zip_code: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    pseudo: string;
    email: string;
    role: "user" | "admin";
  };
};

const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/inscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    const result = await response.json();

    sessionStorage.setItem("jwt", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    const result = await response.json();

    sessionStorage.setItem("jwt", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  logout(): void {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    window.location.href = "/connexion";
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("jwt");
  },

  getToken(): string | null {
    return sessionStorage.getItem("jwt");
  },

  getCurrentUser(): AuthResponse["user"] | null {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "admin";
  },
};

export default authService;
