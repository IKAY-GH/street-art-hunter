import { api } from "./api";

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

const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/api/users/inscription", data);

    sessionStorage.setItem("jwt", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user));

    return response;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post("/api/users/login", data);

    sessionStorage.setItem("jwt", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user));

    return response;
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
