import {api} from "@/lib/api.ts";


export const traceService = {
    async getTracesByChatbotId(chatbotId: string) {
        return await api.get(`/trace/chatbot/${chatbotId}`);
    },
}