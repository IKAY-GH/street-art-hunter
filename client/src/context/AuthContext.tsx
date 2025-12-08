import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../../../server/src/utils/jwt";
import authService from "../services/authService";

// Props interface for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Type definition for authentication context values
interface AuthContextType {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean | ((prev: boolean) => boolean)) => void;
  setRole: (value: "user" | "admin" | null) => void;
  logout: () => void;
}

// Create authentication context with null as default value
const AuthContext = createContext<AuthContextType | null>(null);

// Global authentication provider - wraps entire app to provide auth state
export function AuthProvider({ children }: AuthProviderProps) {
  // Track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Store user role (user/admin)
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  // Loading state prevents premature redirects during token verification
  const [isLoading, setIsLoading] = useState(true);

  // Verify JWT token on app startup to restore authentication state
  useEffect(() => {
    const token = authService.getToken();

    if (token) {
      try {
        // Decode JWT to extract payload (id, email, role, exp)
        const decoded = jwtDecode<JwtPayload>(token);

        // Check if token is not expired (exp is in seconds, Date.now() in milliseconds)
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setRole(decoded.role);
        } else {
          // Token expired - log out user
          authService.logout();
        }
      } catch (error) {
        // Token invalid or malformed - log out user
        authService.logout();
      }
    }

    // Mark loading as complete - app can now render protected routes
    setIsLoading(false);
  }, [setIsAuthenticated, setRole]);

  // Logout function - clears auth state and calls authService.logout()
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        isLoading,
        setIsAuthenticated,
        setRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context - must be used inside AuthProvider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
