import { z } from "zod";
import {ObjectIdString} from "../../core/zod/types";

/**
 * Chatbot Output Schema (for a single chatbot)
 */
export const ChatbotOutputSchema = z.object({
    id: z.string(),
    name: z.string(),
    environment: z.enum(["dev", "prod"]),
    developerId: ObjectIdString,
    clients: z.array(ObjectIdString),
    createdAt: z.preprocess((val) => {
        if (val instanceof Date) return val.toISOString();
        return val;
    }, z.string())
});


/**
 * Chatbots Output Schema (for many chatbots)
 */
export const ChatbotManyOutputSchema = z.array(ChatbotOutputSchema);


export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
export type ChatbotManyOutput = z.infer<typeof ChatbotManyOutputSchema>;
