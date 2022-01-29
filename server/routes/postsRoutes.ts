import express from "express";

import {
  getPostsList,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/postsControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", getPostsList);
router.post("/", auth, addPost);
router.delete("/:idPost/:idOwner", auth, deletePost);
router.put("/:idPost", auth, updatePost);

export default router;
