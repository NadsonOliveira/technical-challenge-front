"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  role: MessageRole;
  text: string;
  type?: "text" | "pdf";
  documentId?: string;
}

interface MessageState {
  messages: Message[];
  messagesByChat?: Record<string, Message[]>; 
}

const initialState: MessageState = {
  messages: [],
  messagesByChat: {}, 
};

const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    setMessagesBots: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },

    addMessageToChat: (
      state,
      action: PayloadAction<{ chatbotId: string; message: Message }>
    ) => {
      const { chatbotId, message } = action.payload;
      if (!state.messagesByChat) state.messagesByChat = {};
      if (!state.messagesByChat[chatbotId]) state.messagesByChat[chatbotId] = [];
      state.messagesByChat[chatbotId].push(message);
    },

    setMessagesForChat: (
      state,
      action: PayloadAction<{ chatbotId: string; messages: Message[] }>
    ) => {
      const { chatbotId, messages } = action.payload;
      if (!state.messagesByChat) state.messagesByChat = {};
      state.messagesByChat[chatbotId] = messages;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setMessagesBots,
  addMessageToChat,
  setMessagesForChat,
} = MessageSlice.actions;

export default MessageSlice.reducer;
