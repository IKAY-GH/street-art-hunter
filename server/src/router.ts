import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import { upload } from "./middlewares/multer";
import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import discoveredActions from "./modules/discovered/discoveredActions";
import discoveredRouter from "./modules/discovered/discoveredRouter";
import itemActions from "./modules/item/itemActions";
// Define item-related routes
import userActions from "./modules/user/userActions";

router.post("/api/discovered", upload.single("photo"), discoveredActions.add);

router.use("/discovered", discoveredRouter);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post(
  "/api/users/inscription",
  userActions.hashPassword,
  userActions.add,
);

router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.post("/api/artists", artistActions.add);

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.post("/api/artworks", artworkActions.add);

/* ************************************************************************* */

export default router;
