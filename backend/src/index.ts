import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Index page");
});

app.post("/api/v1/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.json({ message: "Signup route" });
});

app.post("/api/v1/signin", (c) => {
  return c.json({ message: "Signin route" });
});

app.post("/api/v1/blog", (c) => {
  return c.json({ message: "Create Blog route" });
});

app.put("/api/v1/blog", (c) => {
  return c.json({ message: "Update Blog route" });
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.json({ message: `all Blog ` });
});

app.get("/api/v1/blog/:id", (c) => {
  let id = c.req.param("id");
  return c.json({ message: `Blog with id ${id}` });
});

export default app;
