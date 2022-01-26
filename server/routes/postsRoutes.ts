import express from "express";

import getPostsList from "../controllers/postsControllers";

const router = express.Router();

router.get("/", getPostsList);

export default router;
