import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description?: string | undefined;
}, {
    title: string;
    description?: string | undefined;
}>;
export declare const updateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    published?: boolean | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    published?: boolean | undefined;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    oldPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    newPassword: string;
}>;
export declare const authMiddleZodSchema: z.ZodString;
export type signupInput = z.infer<typeof signupSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export type updateInput = z.infer<typeof updateProfileSchema>;
export type createBlogInput = z.infer<typeof createBlogSchema>;
export type updateBlogInput = z.infer<typeof updateBlogSchema>;
