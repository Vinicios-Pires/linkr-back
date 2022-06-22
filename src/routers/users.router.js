import { Router } from "express";

// import authMiddleware from "../middleware/auth.middleware.js";

import usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/users", usersController.findUsersByUsername);
router.get("/user/:id", usersController.getPostsUser);

export default router;
