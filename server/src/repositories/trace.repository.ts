import { injectable } from "tsyringe";
import { Trace, ITrace } from "../models/trace.model";

@injectable()
export class TraceRepository {
    /**
     * Create a new trace
     */
    async create(data: Partial<ITrace>): Promise<ITrace> {
        return await Trace.create(data);
    }

    /**
     * Get a trace by ID
     */
    async findById(id: string): Promise<ITrace | null> {
        return await Trace.findById(id).exec();
    }

    /**
     * Get traces by chatbot ID
     */
    async findByChatbotId(chatbotId: string): Promise<ITrace[]> {
        return await Trace.find({chatbot_id: chatbotId }).sort({ createdAt: -1 }).exec();
    }

    /**
     * Update trace by ID
     */
    async update(id: string, data: Partial<ITrace>): Promise<ITrace | null> {
        return await Trace.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Delete trace by ID
     */
    async delete(id: string): Promise<void> {
        await Trace.findByIdAndDelete(id).exec();
    }
}
