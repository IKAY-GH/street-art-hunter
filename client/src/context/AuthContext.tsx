import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../../../server/src/utils/jwt";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
  setIsAuthenticated: (value: boolean | ((prev: boolean) => boolean)) => void;
  setRole: (value: "user" | "admin" | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  // Au montage du composant, vérifier si un token existe dans sessionStorage
  useEffect(() => {
    console.log("🔍 AuthContext useEffect déclenché");
    const token = sessionStorage.getItem("jwt");
    console.log("🔑 Token trouvé:", token ? "OUI" : "NON");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log("✅ Token décodé:", decoded);

        // Vérifier si le token n'est pas expiré
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          console.log("✅ Token valide, mise à jour de l'état");
          setIsAuthenticated(true);
          setRole(decoded.role);
          console.log("✅ État après mise à jour - isAuth devrait être true");
        } else {
          console.log("❌ Token expiré");
          // Token expiré, le supprimer
          sessionStorage.removeItem("jwt");
        }
      } catch (error) {
        console.log("❌ Erreur décodage token:", error);
        // Token invalide, le supprimer
        sessionStorage.removeItem("jwt");
      }
    }
  }, [setIsAuthenticated, setRole]);
  
  const logout = () => {
    // Supprimer TOUTES les données de session
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, setIsAuthenticated, setRole, logout }}
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
