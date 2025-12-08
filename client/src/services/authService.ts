// Backend API URL - uses environment variable or defaults to localhost:3311
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3311";

// Type definition for user registration data
export type RegisterData = {
  pseudo: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  zip_code: number;
};

// Type definition for user login credentials
export type LoginData = {
  email: string;
  password: string;
};

// Type definition for authentication response from backend
export type AuthResponse = {
  token: string;
  user: {
    id: number;
    pseudo: string;
    email: string;
    role: "user" | "admin";
  };
};

// Centralized authentication service - handles all auth-related operations
const authService = {
  // Register a new user account
  async register(data: RegisterData): Promise<AuthResponse> {
    // Send POST request to registration endpoint
    const response = await fetch(`${API_URL}/api/users/inscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    const result = await response.json();

    // Store JWT token and user data in session storage
    sessionStorage.setItem("jwt", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  // Authenticate existing user with email and password
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    const result = await response.json();

    // Store JWT token and user data in session storage
    sessionStorage.setItem("jwt", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  // Log out user by clearing session storage and redirecting to login
  logout(): void {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    // Force full page reload to reset app state
    window.location.href = "/connexion";
  },

  // Check if user has a valid JWT token
  isAuthenticated(): boolean {
    // Double negation converts string to boolean (null becomes false)
    return !!sessionStorage.getItem("jwt");
  },

  // Retrieve JWT token from session storage
  getToken(): string | null {
    return sessionStorage.getItem("jwt");
  },

  // Retrieve current user data from session storage
  getCurrentUser(): AuthResponse["user"] | null {
    const userStr = sessionStorage.getItem("user");
    // Parse JSON string to object, return null if not found
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if current user has admin role
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    // Optional chaining: returns undefined if user is null, preventing errors
    return user?.role === "admin";
  },
};

export default authService;
