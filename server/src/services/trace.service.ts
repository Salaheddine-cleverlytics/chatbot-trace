import { injectable } from "tsyringe";
import { TraceRepository } from "../repositories/trace.repository";
import {TraceInput, TraceUpdateInput} from "../schema/trace/trace.input";
import { TraceOutput, TraceOutputSchema, TraceManyOutput, TraceManyOutputSchema } from "../schema/trace/trace.output";
import {AppError} from "../core/errors/AppError";
import {toObjectId} from "../core/db/mapper";

@injectable()
export class TraceService {
    constructor(private readonly traceRepository: TraceRepository) {}

    async create(input: TraceInput): Promise<TraceOutput> {
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

    async getByChatbotId(chatbotId: string): Promise<TraceManyOutput> {
        if (!toObjectId(chatbotId)) throw new AppError("Invalid Chatbot ID format", 400);
        const traces = await this.traceRepository.findByChatbotId(chatbotId);
        if (!traces || traces.length === 0) return [];
        return  TraceManyOutputSchema.parse(traces);
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
