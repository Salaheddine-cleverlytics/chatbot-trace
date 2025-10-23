import { z } from "zod";
import {ObjectIdTransformSchema} from "../../core/zod/types";


/**
 * Create Chatbot Input Schema
 */
export const ChatbotCreateInputSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters").max(100),
    environment: z.enum(["dev", "prod"]).default("dev"),
    developerId:ObjectIdTransformSchema,
    clients: z.array(ObjectIdTransformSchema).optional(),
});

/**
 * Update Chatbot Input Schema
 */
export const ChatbotUpdateInputSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 characters").max(100).optional(),
    environment: z.enum(["dev", "prod"]).optional(),
    clients: z.array(ObjectIdTransformSchema).optional(),
});

export type ChatbotUpdateInput = z.infer<typeof ChatbotUpdateInputSchema>;
export type ChatbotCreateInput = z.infer<typeof ChatbotCreateInputSchema>;

