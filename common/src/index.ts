import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  email: z.string().email(),
});

export type signupInput = z.infer<typeof signupSchema>;
