import express, { json } from "express";
import cors from "cors";
import router from "./routers/index.js";

import postRouter from "./routers/posts.router.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

export default app;
