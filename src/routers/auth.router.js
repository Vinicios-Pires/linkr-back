import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import joiValidation from "../middleware/joi.validation.js";
import { SignInSchema, SignUpSchema } from "../schemas/auth.schema.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/sign-up",
  joiValidation(SignUpSchema),
  authMiddleware.checkEmailAvailable,
  authController.signUserUp,
);

router.post(
  "/sign-in",
  joiValidation(SignInSchema),
  authMiddleware.validateCredentials,
  authController.signUserIn,
);

export default router;
