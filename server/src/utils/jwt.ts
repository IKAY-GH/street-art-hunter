import jwt from "jsonwebtoken";
import type { User } from "../modules/user/usersRepository.ts";

/**
 * JWT (JSON Web Token) utilities for authentication
 * Handles token generation and verification for user sessions
 */

// Load JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant dans le fichier .env");
}

// Generate JWT token for authenticated user
// Token expires in 24 hours
export function generateToken(
  user: User | Pick<User, "id" | "email" | "is_admin">
) {
  // Determine user role based on is_admin flag
  const role = user.is_admin ? "admin" : "user";

  // Sign JWT with user data (id, email, role) and set expiration
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

// TypeScript type definition for JWT payload
export type JwtPayload = {
  id: number;
  email: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
};

// Verify and decode JWT token
// Returns payload if valid, null if invalid or expired
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}
