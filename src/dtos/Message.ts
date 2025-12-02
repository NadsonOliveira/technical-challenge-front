export interface Message {
  id: string;
  chatbotId: string;
  text?: string;
  role?: "user" | "assistant" | "system";
  content: string;
  sender: "user" | "assistant";
  createdAt: string;
}
