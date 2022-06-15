import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import JoiValidation from "../middleware/joi.validation.js";
import {PostSchema,LinkSchema} from "../schemas/posts.schema.js";
import postMiddleware from "../middleware/posts.middleware.js";

const router = Router();

router.get(
    "/post",
    postsController.getPosts
)

export default router;