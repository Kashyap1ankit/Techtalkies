"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    firstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
});
