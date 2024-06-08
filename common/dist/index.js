"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleZodSchema = exports.updateProfileSchema = exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
//Singup schema
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
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
    description: zod_1.z.string().optional(),
});
//Update new Blog schema
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
//Update profile schema
exports.updateProfileSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(4).max(8),
    newPassword: zod_1.z.string().min(4).max(8),
});
//Auth middleware
exports.authMiddleZodSchema = zod_1.z.string().startsWith("Bearer ");
