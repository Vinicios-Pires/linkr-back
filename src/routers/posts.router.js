import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import JoiValidation from "../middleware/joi.validation.js";
import { PostSchema } from "../schemas/posts.schema.js";

const postsRouter = Router();

postsRouter.post(
  "/timeline",
  authMiddleware.validateToken,
  JoiValidation(PostSchema),
  postsController.createPost,
);
postsRouter.get("/timeline", postsController.getPosts);

export default postsRouter;
