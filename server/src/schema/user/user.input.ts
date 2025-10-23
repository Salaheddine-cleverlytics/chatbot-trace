import { z } from "zod";


export const RegisterInputSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .trim(),
    email: z
        .string()
        .email("Invalid email format")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    role: z.enum(["developer", "client"]).optional(),
});



export const LoginInputSchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .toLowerCase()
        .trim(),
    password: z.string().min(1, "Password is required"),
});


export type LoginInput = z.infer<typeof LoginInputSchema>;
export type RegisterInput = z.infer<typeof RegisterInputSchema>;
