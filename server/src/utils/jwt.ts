import jwt from "jsonwebtoken";
import type { User } from "../modules/user/usersRepository.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant dans le fichier .env");
}

export function generateToken(
  user: User | Pick<User, "id" | "email" | "is_admin">
) {
  // Gérer is_admin comme number (0, 1) ou boolean (false, true) ou null
  const role = user.is_admin ? "admin" : "user";

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export type JwtPayload = {
  id: number;
  email: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
};

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}
