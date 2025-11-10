import express from "express";
import { upload } from "../../middlewares/multer";
import discoveredActions from "./discoveredActions";

const router = express.Router();

router.post("/", upload.single("photo"), discoveredActions.add);

export default router;
