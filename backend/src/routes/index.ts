import { Hono } from "hono";
import userRouter from "./users";
import blogRouter from "./blogs";

const indexRouter = new Hono();

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

export default indexRouter;
