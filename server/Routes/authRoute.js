import express from "express";
import {
  validateUserLogin,
  validateUserRegistration,
} from "../Validators/userValidator.js";
import { loginUser, registerUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);

export default router;
