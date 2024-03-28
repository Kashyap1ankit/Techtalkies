import { verify } from "hono/jwt";

export async function authMiddleware(c: any, next: () => void) {
  try {
    let token = c.req.header("Authorization").split(" ")[1];
    const JWT_SECRET = c.env.JWT_SECRET;

    const decoded = await verify(token, JWT_SECRET);
    if (!decoded) throw new Error("Invalid token");
    c.set("userId", decoded.userId);
  } catch (error: any) {
    c.status(406);
    return c.json({ error });
  }
  await next();
}
