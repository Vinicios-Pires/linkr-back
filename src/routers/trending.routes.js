import { Router } from "express"

import trendingController from "../controllers/trending.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const trendingRouter = Router()

trendingRouter.get("/trending", trendingController.getTrendings)
trendingRouter.get("/hashtag/:hashtag", authMiddleware.validateToken, trendingController.getHashtagPosts)

export default trendingRouter