import express from "express";
import addUser from "../controllers/usersControllers";

const router = express.Router();

router.post("/register", addUser);

export default router;
