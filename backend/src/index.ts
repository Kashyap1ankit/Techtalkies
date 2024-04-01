import { Hono } from "hono";
import indexRouter from "./routes/index";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
app.use(cors());

app.get("/", (c) => {
  return c.text("Index page");
});

app.route("/api/v1", indexRouter);

export default app;
