import { Router } from "express";
import authRouter from "./auth.router.js";
import postsRouter from "./posts.router.js";
import usersRouter from "./users.router.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(usersRouter);

export default router;
