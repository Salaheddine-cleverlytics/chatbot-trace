import { injectable } from "tsyringe";
import { TraceRepository } from "../repositories/trace.repository";
import {TraceInput, TraceUpdateInput} from "../schema/trace/trace.input";
import {
    TraceOutput,
    TraceOutputSchema,
    PaginatedTraceOutput, PaginatedTraceOutputSchema
} from "../schema/trace/trace.output";
import {AppError} from "../core/errors/AppError";
import {toObjectId} from "../core/db/mapper";

@injectable()
export class TraceService {
    constructor(private readonly traceRepository: TraceRepository) {}

        async create(input: TraceInput): Promise<TraceOutput> {
            if (input.rating &&  input.rating > 5) {
                throw new AppError("Rating cannot be greater than 5", 400);
            }
            const trace = await this.traceRepository.create(input);
            return TraceOutputSchema.parse(trace);
        }

    async getById(id: string): Promise<TraceOutput> {
          if (!toObjectId(id)) throw new AppError("Invalid Trace ID format", 400);
        const trace = await this.traceRepository.findById(id);
        if (!trace) {
            throw new AppError(`Trace with id ${id} not found`);
        }
        return TraceOutputSchema.parse(trace);
    }

    async getByChatbotId(
        chatbotId: string,
        page = 1,
        limit = 10
    ): Promise<PaginatedTraceOutput> {
        if (!toObjectId(chatbotId)) throw new AppError("Invalid Chatbot ID format", 400);

        const result = await this.traceRepository.findByChatbotId(chatbotId, page, limit);
         return  PaginatedTraceOutputSchema.parse(result);
    }


    async update(id: string, input:TraceUpdateInput): Promise<TraceOutput> {
        if (!toObjectId(id)) throw new AppError("Invalid Trace ID format", 400);
        const trace = await this.traceRepository.update(id, input);
        if (!trace) {
            throw new AppError("Trace not found",404);
        }
        return TraceOutputSchema.parse(trace);
    }


    async delete(id: string): Promise<void> {
        if (!toObjectId(id)) throw new AppError("Invalid Trace ID format", 400);
        await this.traceRepository.delete(id);
    }
}
