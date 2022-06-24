import { Router } from "express"

import { getTrendings, getHashtagPosts } from "../controllers/trending.controller.js"

const trendingRouter = Router()

trendingRouter.get("/trending", getTrendings)
trendingRouter.get("/trending/:hashtag", getHashtagPosts)

export default trendingRouter