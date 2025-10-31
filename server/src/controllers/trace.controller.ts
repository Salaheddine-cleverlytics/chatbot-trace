import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { TraceService } from "../services/trace.service";
import {TraceInput, TraceInputSchema, TraceUpdateInput, TraceUpdateInputSchema} from "../schema/trace/trace.input";

@injectable()
export class TraceController {
    constructor(private readonly traceService: TraceService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const input: TraceInput = TraceInputSchema.parse(req.body);
            const trace = await this.traceService.create(input);
            res.status(201).json({
                success: true,
                message: "Trace created successfully",
                data: trace,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const trace = await this.traceService.getById(id);
            res.json({
                success: true,
                message: "Trace fetched successfully",
                data: trace,
            });
        } catch (error) {
            next(error);
        }
    }

    async getByChatbotId(req: Request, res: Response, next: NextFunction) {
        try {
            const { chatbotId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const traces = await this.traceService.getByChatbotId(chatbotId, page, limit);
            res.json({
                success: true,
                message: "Traces fetched successfully",
                data: traces,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const input: TraceUpdateInput = TraceUpdateInputSchema.parse(req.body);
            const trace = await this.traceService.update(id, input);
            res.json({
                success: true,
                message: "Trace updated successfully",
                data:trace,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.traceService.delete(id);
            res.json({
                success: true,
                message: "Trace deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}
