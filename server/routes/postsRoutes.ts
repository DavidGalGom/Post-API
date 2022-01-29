import express from "express";

import { getPostsList, addPost } from "../controllers/postsControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", getPostsList);
router.post("/", auth, addPost);

export default router;
