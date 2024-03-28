import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    firstName: string;
    email: string;
    lastName?: string | undefined;
}, {
    username: string;
    firstName: string;
    email: string;
    lastName?: string | undefined;
}>;
export type signupInput = z.infer<typeof signupSchema>;
