import {ChatbotCreateInput, ChatbotUpdateInput} from "../schema/chatbot/chatbot.input";
import {ChatbotRepository} from "../repositories/chatbot.repository";
import {
    ChatbotManyOutput,
    ChatbotManyOutputSchema,
    ChatbotOutput,
    ChatbotOutputSchema
} from "../schema/chatbot/chatbot.output";
import {injectable} from "tsyringe";
import {toObjectId} from "../core/db/mapper";
import {AppError} from "../core/errors/AppError";

@injectable()
export class ChatbotService {

    constructor(private chatbotRepository: ChatbotRepository) {}

    async create(input: ChatbotCreateInput): Promise<ChatbotOutput> {
        const chatbot = await this.chatbotRepository.create(input);
        return ChatbotOutputSchema.parse(chatbot);
    }

    async update(id: string, input: ChatbotUpdateInput): Promise<ChatbotOutput> {
        if (!toObjectId(id)) {
            throw new AppError("Invalid Chatbot ID format", 400);
        }
        const updated = await this.chatbotRepository.update(id, input);
        if (!updated) {
            throw new AppError(`Chatbot with id ${id} not found`,404);
        }
        return ChatbotOutputSchema.parse(updated);
    }

    async getById(id: string): Promise<ChatbotOutput> {
        if (!toObjectId(id)) {
            throw new AppError("Invalid Chatbot ID format", 400);
        }
        const chatbot = await this.chatbotRepository.findById(id);
        if (!chatbot) {
            throw new AppError(`Chatbot with id ${id} not found`,404);
        }
        return ChatbotOutputSchema.parse(chatbot);
    }

    async getByUser(userId: string): Promise<ChatbotManyOutput> {
        if (!toObjectId(userId)) {
            throw new AppError("Invalid user ID format", 400);
        }
        const chatbots = await this.chatbotRepository.getByUser(userId);
        if (!chatbots || chatbots.length === 0) {
            throw new AppError("No chatbots found for this user", 404);
        }
        return ChatbotManyOutputSchema.parse(chatbots);
    }

    async getAll(): Promise<ChatbotManyOutput> {
        const chatbots = await this.chatbotRepository.findAll();
        return ChatbotManyOutputSchema.parse(chatbots)
    }

    async delete(id: string): Promise<void> {
        if (!toObjectId(id)) {
            throw new AppError("Invalid Chatbot ID format", 400);
        }
        const existingChatbot = await this.chatbotRepository.findById(id);
        if (!existingChatbot) {
            throw new AppError("Chatbot not found", 404);
        }
        await this.chatbotRepository.delete(id);
    }
}
