import express from "express";
import { upload } from "./middlewares/multer";
import authMiddleware from "./middlewares/authMiddleware";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import usersActions from "./modules/user/usersActions";
import adminOnly from "./middlewares/adminOnly";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// ========== ROUTES PUBLIQUES (pas de token requis) ==========

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.post(
  "/api/users/inscription",
  usersActions.hashPassword,
  usersActions.add
);
router.post("/api/users/login", usersActions.login);
router.get("admin/dashboard", authMiddleware.auth, adminOnly, (req, res) => {
  res.json({ message: "Bienvenue administrateur" });
});

router.post("/api/discovered", upload.single("photo"), discoveredActions.add);
router.use("/discovered", discoveredRouter);

// Gestion des artworks - Admin uniquement
router.post(
  "/api/artworks",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  artworkActions.add
);

// Gestion des artists - Admin uniquement
router.post(
  "/api/artist",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  artistActions.add
);

export default router;
