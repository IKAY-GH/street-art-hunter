import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

const auth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401).json({ error: "Token manquant" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token invalide" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
  req.user = decoded;
  next();
};

export default { auth };
