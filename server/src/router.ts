import express from "express";
import artistActions from "./modules/artist/artistActions";
import usersActions from "./modules/user/usersActions";
import { upload } from "./middlewares/multer";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discorveredRepository";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

router.get("/api/user", usersActions.browse);
router.get("/api/user/:id", usersActions.read);
router.post("/api/user", usersActions.hashPassword, usersActions.add);

router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.post("/api/artists", artistActions.add);

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.post("/api/artworks", artworkActions.add);

router.post("/api/discovered", upload.single("photo"), discoveredActions.add);
router.use("/discovered", discoveredRouter);

/* ************************************************************************* */

export default router;
