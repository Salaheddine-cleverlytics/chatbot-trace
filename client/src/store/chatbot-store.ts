import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Chatbot = {
    id: string;
    name: string;
    environment: "dev" | "production";
    developerId: string;
    clients: string[];
    createdAt?: Date | string;
};

type ChatbotStore = {
    chatbots: Chatbot[];
    setChatbots: (chatbots: Chatbot[]) => void;
    addChatbot: (chatbot: Chatbot) => void;
};

export const useChatbotStore = create<ChatbotStore>()(
    persist(
        (set) => ({
            chatbots: [],
            setChatbots: (chatbots) => set({ chatbots }),
            addChatbot: (chatbot) =>
                set((state) => ({ chatbots: [...state.chatbots, chatbot] })),
        }),
        {
            name: "chatbot-storage",
        }
    )
);
