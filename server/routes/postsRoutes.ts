import express from "express";
import { validate } from "express-validation";
import postSchema from "../schemas/postSchema";

import {
  getPostsList,
  addPost,
  deletePost,
  updatePost,
  adminDeletePost,
} from "../controllers/postsControllers";
import adminAuth from "../middlewares/adminAuth";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", getPostsList);
router.post("/", auth, validate(postSchema), addPost);
router.delete("/:idPost/:idOwner", auth, deletePost);
router.put("/:idPost/:idOwner", auth, updatePost);
router.delete("/:idPost", auth, adminAuth, adminDeletePost);

export default router;
