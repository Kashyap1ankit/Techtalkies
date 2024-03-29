import { z } from "zod";

//Singup schema

export const signupSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(4).max(8),
});

//Signin Schema

export const signinSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4).max(8),
});

//Create new Blog schema

export const createBlogSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  published: z.boolean(),
});

//Update new Blog schema

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

//Auth middleware

export const authMiddleZodSchema = z.string().startsWith("Bearer ");

export type signupInput = z.infer<typeof signupSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export type createBlogInput = z.infer<typeof createBlogSchema>;
export type updateBlogInput = z.infer<typeof updateBlogSchema>;
