import express from "express";

import {
  getPostsList,
  addPost,
  deletePost,
} from "../controllers/postsControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", getPostsList);
router.post("/", auth, addPost);
router.delete("/:idPost", auth, deletePost);

export default router;
