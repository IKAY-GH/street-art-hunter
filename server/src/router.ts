import express from "express";
import { upload } from "./middlewares/multer";
import authMiddleware from "./middlewares/authMiddleware";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import usersActions from "./modules/user/usersActions";

const router = express.Router();

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.post(
  "/api/users/inscription",
  usersActions.hashPassword,
  usersActions.add
);
router.post("/api/users/login", usersActions.login);
router.put("/api/users/:id", authMiddleware.auth, usersActions.edit);
router.get(
  "/admin/dashboard",
  authMiddleware.auth,
  authMiddleware.isAdmin,
  (req, res) => {
    res.json({ message: "Bienvenue administrateur" });
  }
);

router.post("/api/discovered", upload.single("photo"), discoveredActions.add);
router.use("/discovered", discoveredRouter);

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

router.get("/api/artist", artistActions.browse);
router.get("/api/artist/:id", artistActions.read);
router.put("/api/artist/:id", artistActions.add);
router.delete("/api/artist/:id", artistActions.deleteArtist);

export default router;
