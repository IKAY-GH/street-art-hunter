import express from "express";
import { upload } from "./middlewares/multer";
import authMiddleware from "./middlewares/authMiddleware";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import usersActions from "./modules/user/usersActions";

// Express router for all API endpoints
const router = express.Router();

// User routes
router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
// Registration route with password hashing middleware
router.post(
  "/api/users/inscription",
  usersActions.hashPassword,
  usersActions.add
);
// Login route
router.post("/api/users/login", usersActions.login);
// Update user profile (requires authentication)
router.put("/api/users/:id", authMiddleware.auth, usersActions.edit);

// Admin dashboard route (admin only)
router.get(
  "/admin/dashboard",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  (req, res) => {
    res.json({ message: "Bienvenue administrateur" });
  }
);

// Discovered artworks routes (photo upload)
router.post("/api/discovered", upload.single("photo"), discoveredActions.add);
router.use("/discovered", discoveredRouter);

// Artwork routes (admin only for creation)
router.post(
  "/api/artworks",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  artworkActions.add
);

router.post(
  "/api/artist",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  artistActions.add
);

// Artist routes (public read, admin write)
router.get("/api/artist", artistActions.browse);
router.get("/api/artist/:id", artistActions.read);
router.put("/api/artist/:id", artistActions.add);
router.delete("/api/artist/:id", artistActions.deleteArtist);

export default router;
