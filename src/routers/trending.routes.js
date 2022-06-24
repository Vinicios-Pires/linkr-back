import { Router } from "express"

import trendingController from "../controllers/trending.controller.js"

const trendingRouter = Router()

trendingRouter.get("/trending", trendingController.getTrendings)
trendingRouter.get("/trending/:hashtag", trendingController.getHashtagPosts)

export default trendingRouter