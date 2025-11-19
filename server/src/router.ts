import express from "express";
import { upload } from "./middlewares/multer";
import { authenticate, isAdmin } from "./middlewares/auth";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import usersActions from "./modules/user/usersActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// ========== ROUTES PUBLIQUES (pas de token requis) ==========

// Inscription (crée un user et retourne un token)
router.post(
  "/api/users/inscription",
  usersActions.hashPassword,
  usersActions.add
);

// Connexion (vérifie email/password et retourne un token)
router.post("/api/users/login", usersActions.login);

// ========== ROUTES PROTÉGÉES (token requis) ==========

// Artworks - Accessibles par users et admins
router.get("/api/artworks", authenticate, artworkActions.browse);
router.get("/api/artworks/:id", authenticate, artworkActions.read);

// Artists - Accessibles par users et admins
router.get("/api/artist", authenticate, artistActions.browse);
router.get("/api/artist/:id", authenticate, artistActions.read);

// Discovered - Accessible par users et admins
router.post(
  "/api/discovered",
  authenticate,
  upload.single("photo"),
  discoveredActions.add
);
router.use("/discovered", authenticate, discoveredRouter);

// ========== ROUTES ADMIN UNIQUEMENT ==========

// Gestion des users - Admin uniquement
router.get("/api/users", authenticate, isAdmin, usersActions.browse);
router.get("/api/users/:id", authenticate, isAdmin, usersActions.read);

// Gestion des artworks - Admin uniquement
router.post("/api/artworks", authenticate, isAdmin, artworkActions.add);

// Gestion des artists - Admin uniquement
router.post("/api/artist", authenticate, isAdmin, artistActions.add);

export default router;
