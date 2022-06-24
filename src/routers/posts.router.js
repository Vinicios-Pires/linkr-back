import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import JoiValidation from "../middleware/joi.validation.js";
import { PostSchema, DescriptionSchema } from "../schemas/posts.schema.js";

const postsRouter = Router();

postsRouter.post(
  "/timeline",
  authMiddleware.validateToken,
  JoiValidation(PostSchema),
  postsController.createPost,
);

postsRouter.get("/timeline", authMiddleware.validateToken, postsController.getPosts);

postsRouter.delete(
  "/posts/:id",
  authMiddleware.validateToken,
  postsController.deletePost,
);

postsRouter.put(
  "/posts/:id",
  authMiddleware.validateToken,
  JoiValidation(DescriptionSchema),
  postsController.updatePost,
);

postsRouter.post(
  "/posts/:postId/:likeAction",
  authMiddleware.validateToken,
  postsController.handleLikeDislikePost,
);

export default postsRouter;
