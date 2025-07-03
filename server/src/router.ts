import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import artistActions from "./modules/artist/artistActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";

import user from "./modules/user/utilisateurAction";
import utilisateurAction from "./modules/user/utilisateurAction";

router.get("/api/user", utilisateurAction.browse);
router.get("/api/user/:id", utilisateurAction.read);
router.post("/api/user", utilisateurAction.add);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.post("/api/artists", artistActions.add);
/* ************************************************************************* */

export default router;
