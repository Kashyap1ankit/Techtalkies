import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import userRouter from "./users";
import blogRouter from "./blogs";
import { authMiddleware } from "../middleware";

const indexRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

indexRouter.get("/auth", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    c.status(200);
    return c.json({ userId: userId });
  } catch (error) {
    c.status(406);
    return c.json({ message: "User doesn't exists" });
  }
});

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

export default indexRouter;
