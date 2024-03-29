import { verify } from "hono/jwt";
import { authMiddleZodSchema } from "package-medium";

export async function authMiddleware(c: any, next: () => void) {
  try {
    let hToken = c.req.header("Authorization");
    const { success } = authMiddleZodSchema.safeParse(hToken);
    if (!success) {
      c.status(411);
      return c.json({ message: "Invalid Token" });
    }
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
