export interface CreateMessageDto {
  chatbotId: string;
  textContent?: string;
  content: string;
  question?: string;
  sender: "user" | "assistant" | "system";
  isError?: boolean;
}
