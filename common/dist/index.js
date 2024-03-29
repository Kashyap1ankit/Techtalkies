"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleZodSchema = exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
//Singup schema
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    firstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4).max(8),
});
//Signin Schema
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(4).max(8),
});
//Create new Blog schema
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string(),
    published: zod_1.z.boolean(),
});
//Update new Blog schema
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
//Auth middleware
exports.authMiddleZodSchema = zod_1.z.string().startsWith("Bearer ");
