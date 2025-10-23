import z from "zod";






export const UserOutputSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["developer", "client"]),
    createdAt: z.string(), // ISO date string
    updatedAt: z.string(), // ISO date string
    token: z.string(),
});

export type UserOutput = z.infer<typeof UserOutputSchema>