import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

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

const auth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token manquant" });
      return;
    }

    const token = authHeader.substring(7);

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: "Token invalide ou expiré" });
      return;
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Accès refusé : admin requis" });
    return;
  }

  next();
};

export default { auth, isAdmin };
