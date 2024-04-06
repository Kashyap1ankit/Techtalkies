import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
  signupSchema,
  signinSchema,
  updateProfileSchema,
} from "package-medium";
import { authMiddleware } from "../middleware";
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// --------------------------------------Signup route-----------------------

userRouter.post("/signup", async (c) => {
  //Generating the client

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //Getting the jwt token

  const JWT_SECRET = c.env.JWT_SECRET;

  //Getting details from body

  const body = await c.req.json();

  //Zod validation

  const { success } = signupSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Input validation failed" });
  }
  //Inserting the user in db

  try {
    const insertUser = await prisma.user.create({
      data: {
        username: body.username,
        firstName: body.firstName,
        lastName: body?.lastName,
        email: body.email,
        password: body.password,
      },
    });

    //If all right then generating the token

    const payload = {
      userId: insertUser.id,
      username: insertUser.username,
    };

    const token = await sign(payload, JWT_SECRET);
    c.status(200);
    return c.json({ token });
  } catch (error: any) {
    c.status(406);
    //If duplicate entry then giving speciific error
    if (error.code === "P2002")
      return c.json({ message: `${error.meta.target[0]} already exist` });
  }
  return c.json({ message: "Database Error" });
});

// -------------------------------Signin Route ----------------------------

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //Getting the jwt token

  const JWT_SECRET = c.env.JWT_SECRET;

  //Getting details from body

  const body = await c.req.json();

  try {
    //Zod validation

    const { success } = signinSchema.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Input validation failed" });
    }

    const res = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
      select: {
        username: true,
        id: true,
      },
    });

    if (!res) throw new Error("No Such User exist");
    //Token generation
    const payload = {
      userId: res.id,
      username: res.username,
    };

    const token = await sign(payload, JWT_SECRET);
    c.status(200);
    return c.json({ token });
  } catch (error: any) {
    c.status(406);
    return c.json({ message: error.message });
  }
});

// -------------------------------Update Route ----------------------------

userRouter.put("/", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    //Zod validation
    const { success } = updateProfileSchema.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Input validation failed" });
    }

    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        password: true,
      },
    });

    const oldPassword = body.oldPassword;
    const newPassword = body.newPassword;
    const firstName = body.firstName;

    if (oldPassword !== getUser?.password) {
      c.status(411);
      return c.json({ message: "Password mismatched" });
    }

    const update = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: firstName,
        password: newPassword,
      },
    });
    c.status(200);
    return c.json({ message: "Password Updated" });
  } catch (error) {
    c.status(406);
    return c.json({ message: "Wrong old password" });
  }
});

// -------------------------------Delete Route ----------------------------

userRouter.delete("/destroy", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const passwordForm = body.password;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    if (passwordForm !== getUser?.password) {
      c.status(411);
      return c.json({ message: "Password mismatched" });
    }

    const res = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return c.json({ message: "Account Deleted Successfully" });
  } catch (error: any) {
    c.status(406);
    return c.json({ message: "Wrong old password" });
  }
});

export default userRouter;
