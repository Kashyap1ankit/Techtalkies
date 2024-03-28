import { Hono } from "hono";

import indexRouter from "./routes/index";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Index page");
});

app.route("/api/v1", indexRouter);

export default app;
