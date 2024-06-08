import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware";
import { createBlogSchema, updateBlogSchema } from "package-medium";
const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

//Get all the blog post

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const takeNumber = Number(c.req.query("number"));

  try {
    const allPosts = await prisma.post.findMany({
      take: takeNumber,
      orderBy: {
        createdAt: "desc", //will return the recent posts
      },
      select: {
        title: true,
        description: true,
        id: true,
        published: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return c.json({ allPosts });
  } catch (error) {
    return c.json({ message: "Not Logged In" });
  }
});

//Get  blog post by id

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let id = c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },

      select: {
        title: true,
        description: true,
        id: true,
        published: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return c.json({ post: [post] });
  } catch (error) {
    return c.json({ message: "Not Logged In" });
  }
});

//To avoid the valiadtion of login in this 2 routes

blogRouter.use(authMiddleware);

// Create blog route

blogRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    //zod validation
    const { success } = createBlogSchema.safeParse(body);
    c.status;
    if (!success) {
      c.status(411);
      return c.json({ message: "Input validation failed" });
    }
    const insertPost = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        published: body.published || true,
        authorId: authorId,
      },
    });
    c.status(200);
    return c.json({ post: insertPost });
  } catch (error) {
    c.status(406);
    return c.json({ message: "Not Logged In" });
  }
});

//Update blog route

blogRouter.put("/", async (c) => {
  const authorId = c.get("userId");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    //zod validation
    const { success } = updateBlogSchema.safeParse(body);
    c.status;
    if (!success) {
      c.status(411);
      return c.json({ message: "Input validation failed" });
    }

    const res = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId,
      },
      data: {
        title: body.title,
        description: body.description,
        published: body.published,
      },
    });
    c.status(200);
    return c.json({ res });
  } catch (error: any) {
    c.status(406);
    if (error.code === "P2025")
      return c.json({ message: `${error.meta.cause}` });
    return c.json({ message: "Not Logged In" });
  }
});

//Destroy Blog route

blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getPost = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (!getPost) {
      c.status(406);
      return c.json({ message: "No such Post found" });
    }
    const del = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return c.json({ message: "Post deleted succesfuuly" });
  } catch (error) {
    c.status(406);
    return c.json({ message: "No such Post found" });
  }
});

export default blogRouter;
