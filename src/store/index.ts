"use client";

import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import messageReducer from "./MessageSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
