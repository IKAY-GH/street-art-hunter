// import type { RequestHandler } from "express";
// import { verifyToken } from "../utils/jwt";

// // Étendre le type Request pour y ajouter user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: number;
//         email: string;
//         role: "user" | "admin";
//       };
//     }
//   }
// }

// // Middleware : Vérifier que l'utilisateur est authentifié
// export const authenticate: RequestHandler = (req, res, next) => {
//   try {
//     // 1. Récupérer le token du header Authorization
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       res.status(401).json({ message: "Token manquant" });
//       return;
//     }

//     // 2. Extraire le token (enlever "Bearer ")
//     const token = authHeader.substring(7);

//     // 3. Vérifier et décoder le token
//     const decoded = verifyToken(token);

//     // 4. Ajouter les infos user à la requête
//     req.user = decoded;

//     // 5. Passer au middleware suivant
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token invalide ou expiré" });
//   }
// };

// // Middleware : Vérifier que l'utilisateur est admin
// export const isAdmin: RequestHandler = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({ message: "Non authentifié" });
//     return;
//   }

//   if (req.user.role !== "admin") {
//     res.status(403).json({ message: "Accès refusé : admin requis" });
//     return;
//   }

//   next();
// };
