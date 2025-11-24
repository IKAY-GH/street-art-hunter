import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

import type { JwtPayload } from "../../../server/src/utils/jwt";

export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  const token = data.token;
  const decoded = jwtDecode<JwtPayload>(token);
  const { setIsAuthenticated, setRole } = useAuth();
  setIsAuthenticated(true);
  setRole(decoded.role);

  sessionStorage.setItem("jwt", token);
}
