import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_par_defaut_CHANGEZ_MOI";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

interface TokenPayload {
  userId: number;
  email: string;
  role: "user" | "admin";
}

// Générer un token JWT
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
}
