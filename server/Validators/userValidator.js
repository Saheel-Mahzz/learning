//userValidator.js
import { body } from "express-validator";

export const validateUserRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];

export const validateUserLogin = [
  body("email").isEmail().withMessage("Invalid email format!"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

export const validateUserUpdate = [
  body("email").optional().isEmail().withMessage("Invalid email format!"),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username cannot be empty"),
];
