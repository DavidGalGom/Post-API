import express from "express";
import { validate } from "express-validation";
import { addUser, loginUser } from "../controllers/usersControllers";
import userSchema from "../schemas/userSchema";

const router = express.Router();

router.post("/register", validate(userSchema), addUser);
router.post("/login", loginUser);

export default router;
