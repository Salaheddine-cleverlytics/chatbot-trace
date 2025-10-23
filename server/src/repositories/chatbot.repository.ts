import { injectable } from "tsyringe";
import { Chatbot, IChatbot } from "../models/chatbot.model";
import { Types } from "mongoose";

@injectable()
export class ChatbotRepository {
    /**
     * Create a new chatbot
     */
    async create(data: Partial<IChatbot>): Promise<IChatbot> {
        return Chatbot.create(data);
    }

    /**
     * Find all chatbots
     */
    async findAll(): Promise<IChatbot[]> {
        return Chatbot.find().exec();
    }

    /**
     * Find chatbot by ID
     */
    async findById(id: string): Promise<IChatbot | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Chatbot.findById(id).exec();
    }

    /**
     * Update chatbot by ID
     */
    async update(id: string, data: Partial<IChatbot>): Promise<IChatbot | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Chatbot.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Delete chatbot by ID
     */
    async delete(id: string): Promise<IChatbot | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        return Chatbot.findByIdAndDelete(id).exec();
    }



    /**
     * Get all chatbots accessible by a user:
     * - If user is developer, include their owned chatbots.
     * - If user is a client, include chatbots where they are listed in `clients`.
     */
    async getByUser(userId: string): Promise<IChatbot[]> {
        if (!Types.ObjectId.isValid(userId)) return [];
        return Chatbot.find({
            $or: [
                { developerId: userId },
                { clients: userId }
            ]
        }).exec();
    }
}
