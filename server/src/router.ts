import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import artistActions from "./modules/artist/artistActions";
import artworkActions from "./modules/artwork/artworkActions";
import itemActions from "./modules/item/itemActions";
// Define item-related routes
import userActions from "./modules/user/userActions";

import user from "./modules/user/utilisateurAction";
import utilisateurAction from "./modules/user/utilisateurAction";

router.get("/api/user", utilisateurAction.browse);
router.get("/api/user/:id", utilisateurAction.read);
router.post("/api/user", utilisateurAction.add);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);

router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.post("/api/artists", artistActions.add);

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.post("/api/artworks", artworkActions.add);

/* ************************************************************************* */

export default router;
