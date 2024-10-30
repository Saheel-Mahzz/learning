import express from "express";
import { validateUserUpdate } from "../Validators/userValidator.js";
import { authenticateJWT } from "../Middlewares/authMiddleware.js";
import { deleteUser, updateUser } from "../Controllers/userController.js";

const router = express.Router();

router.use(authenticateJWT);

router.put("/update", validateUserUpdate, updateUser);
router.delete("/delete", deleteUser);

export default router;
