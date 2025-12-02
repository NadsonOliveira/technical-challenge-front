import { api } from "@/lib/api";
import { AskRagDto } from "@/dtos/ask-rag.dto";
import { CreateMessageDto } from "@/dtos/create-message.dto";
import { CreateChatbotDto } from "@/dtos/create-chat.dto";


export const ChatService = {
    async ask(chatbotId: string, payload: AskRagDto) {
         const question = await api.post(`/chatbots/${chatbotId}/ask`, payload);
         console.log("ChatService.ask response:", question.data);
         return question;
    },

    async create(dto: CreateChatbotDto) {
        const res = await api.post("/chatbots", dto);
        return res.data;
    },

    async saveMessage(payload: CreateMessageDto) {
        return api.post(`/messages`, payload);
    },

    async list() {
        const res = await api.get("/chatbots");
        return res.data;
    },

    async getById(id: string) {
        const res = await api.get(`/chatbots/${id}`);
        console.log("ChatService.getById response:", res.data);
        return res.data;
    },

    async generateEmbeddings(documentId: string) {
        const res = await api.post(`/embeddings/generate/${documentId}`);
        return res.data;
  },
};