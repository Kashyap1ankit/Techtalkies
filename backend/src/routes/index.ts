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

      select: {
        id: true,
        username: true,
      },
    });

    if (!res) throw new Error();
    c.status(200);
    return c.json({ res });
  } catch (error) {
    console.log(error);
    c.status(406);
    return c.json({ message: "User doesn't exists" });
  }
});

//To get all the bookmarks of the user

indexRouter.get("/bookmark", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findFirst({
      relationLoadStrategy: "join",
      where: {
        id: userId,
      },
      select: {
        bookmarks: {
          select: {
            post: {
              select: {
                id: true,
                title: true,
                createdAt: true,
                description: true,
                thumbnail: true,
                author: {
                  select: {
                    email: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!res) throw new Error("Error While fetching the data");
    c.status(200);
    return c.json({
      bookmarks: res?.bookmarks,
    });
  } catch (error) {
    c.status(404);
    return c.json({
      message: "Error While Fetching the Data",
    });
  }
});

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

export default indexRouter;
