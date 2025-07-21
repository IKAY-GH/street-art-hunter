import express from "express";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import usersActions from "./modules/user/usersActions";
import { upload } from "./middlewares/multer";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes


router.post("/api/discovered", upload.single("photo"), discoveredActions.add);
router.use("/discovered", discoveredRouter);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/inscription",
  userActions.hashPassword,
  userActions.add,
);
router.post("/api/user", usersActions.hashPassword, usersActions.add);


router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.post("/api/artists", artistActions.add);


router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.post("/api/artworks", artworkActions.add);

export default router;
