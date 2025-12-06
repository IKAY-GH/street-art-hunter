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

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean | ((prev: boolean) => boolean)) => void;
  setRole: (value: "user" | "admin" | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setRole(decoded.role);
        } else {
          authService.logout();
        }
      } catch (error) {
        authService.logout();
      }
    }

    setIsLoading(false);
  }, [setIsAuthenticated, setRole]);

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
