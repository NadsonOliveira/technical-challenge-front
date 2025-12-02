"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chatbot {
  id: string;
  name: string;
  description?: string;
}

interface ChatState {
  selectedChatbotId: string | null;
  documentId: string | null;
  chatbots: Chatbot[];
}

const initialState: ChatState = {
  selectedChatbotId: null,
  documentId: null,
  chatbots: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatbot(state, action: PayloadAction<string>) {
      state.selectedChatbotId = action.payload;
    },
    setDocument(state, action: PayloadAction<string>) {
      state.documentId = action.payload;
    },
    setChatbots(state, action: PayloadAction<Chatbot[]>) {
      state.chatbots = action.payload;
    },
    addChatbot(state, action: PayloadAction<Chatbot>) {
      state.chatbots.push(action.payload);
    },
  },
});

export const { setChatbot, setDocument, setChatbots, addChatbot } = chatSlice.actions;
export default chatSlice.reducer;
