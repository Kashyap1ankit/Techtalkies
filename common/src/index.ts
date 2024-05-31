import { z } from "zod";

//Singup schema

export const signupSchema = z.object({
  username: z.string().min(3),
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
  description: z.string().optional(),
});

//Update new Blog schema

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

//Update profile schema

export const updateProfileSchema = z.object({
  oldPassword: z.string().min(4).max(8),
  newPassword: z.string().min(4).max(8),
});

//Auth middleware

export const authMiddleZodSchema = z.string().startsWith("Bearer ");

export type signupInput = z.infer<typeof signupSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export type updateInput = z.infer<typeof updateProfileSchema>;
export type createBlogInput = z.infer<typeof createBlogSchema>;
export type updateBlogInput = z.infer<typeof updateBlogSchema>;
