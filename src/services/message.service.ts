import { Message } from "@/dtos/Message";
import { api } from "@/lib/api";

export const MessageService = {
  async listMessageChatBots(chatbotId: string): Promise<Message[]> {
    const res = await api.get(`/messages/chatbot/${chatbotId}`);
    return res.data;
  },
};
