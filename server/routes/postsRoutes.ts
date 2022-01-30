import express from "express";

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
router.post("/", auth, addPost);
router.delete("/:idPost/:idOwner", auth, deletePost);
router.put("/:idPost/:idOwner", auth, updatePost);
router.delete("/:idPost", auth, adminAuth, adminDeletePost);

export default router;
