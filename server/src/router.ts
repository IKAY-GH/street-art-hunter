import express from "express";
import artistActions from "./modules/artist/artistActions";
import usersActions from "./modules/user/usersActions";

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

/* ************************************************************************* */

export default router;
