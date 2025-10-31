import {api} from "@/lib/api.ts";


export const chatbotService = {

    async getAllChatbotByUser(id:string) {
        return await api.get(`/chatbot/user/${id}`);
    }

}