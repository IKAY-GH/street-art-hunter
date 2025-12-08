import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: "user" | "admin";
      };
    }
  }
}

// Middleware to verify JWT token in Authorization header
const auth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and has Bearer format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token manquant" });
      return;
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7);

    // Verify token and decode payload
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: "Token invalide ou expiré" });
      return;
    }

    // Attach decoded user data to request object for next middleware
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

// Middleware to check if user has admin role
const isAdmin: RequestHandler = (req, res, next) => {
  // Ensure user is authenticated (should be called after auth middleware)
  if (!req.user) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  // Check if user has admin role
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Accès refusé : admin requis" });
    return;
  }

  next();
};

export default { auth, isAdmin };
