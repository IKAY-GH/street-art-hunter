import type { RequestHandler } from "express";
const adminOnly: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Accés réservé aux administrateurs" });
  }

  next();
};

export default adminOnly;
