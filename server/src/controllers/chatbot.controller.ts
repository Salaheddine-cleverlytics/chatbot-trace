import { ChatbotService } from "../services/chatbot.service";
import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ChatbotCreateInputSchema, ChatbotUpdateInputSchema } from "../schema/chatbot/chatbot.input";

@injectable()
export class ChatbotController {

    constructor(private readonly chatbotService: ChatbotService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = ChatbotCreateInputSchema.parse(req.body);
            const chatbot = await this.chatbotService.create(parsed);
            res.status(201).json({
                success: true,
                message: "Chatbot created successfully",
                data: chatbot
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const chatbots = await this.chatbotService.getAll();
            res.json({
                success: true,
                data: chatbots
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const chatbot = await this.chatbotService.getById(req.params.id);
            res.json({
                success: true,
                data: chatbot
            });
        } catch (error) {
            next(error);
        }
    }

    async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const chatbots = await this.chatbotService.getByUser(req.params.userId);
            res.json({
                success: true,
                data: chatbots
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = ChatbotUpdateInputSchema.parse(req.body);
            const chatbot = await this.chatbotService.update(req.params.id, parsed);
            res.json({
                success: true,
                message: "Chatbot updated successfully",
                data: chatbot
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.chatbotService.delete(req.params.id);
            res.json({
                success: true,
                message: "Chatbot deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
