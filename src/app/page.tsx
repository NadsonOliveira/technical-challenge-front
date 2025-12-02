"use client";

import PDFUploader from "@/components/PDFUploader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addMessage, setMessages } from "@/store/MessageSlice";
import { ChatService } from "@/services/chat.service";
import { useEffect } from "react";
import { MessageService } from "@/services/message.service";
import { Message } from "@/dtos/Message";

export default function Home() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const chatbotId = useSelector(
    (state: RootState) => state.chat.selectedChatbotId
  );
  const documentId = useSelector((state: RootState) => state.chat.documentId);

  const handleSendMessage = async (text: string) => {
    if (!chatbotId) return alert("Selecione um chatbot antes de conversar.");

    if (!documentId) return alert("Envie um PDF antes de conversar.");

    dispatch(addMessage({ role: "user", text }));

    try {
      const response = await ChatService.ask(chatbotId, {
        documentId,
        question: text,
      });

      const answer = response.data?.answer ?? "Sem resposta.";

      dispatch(addMessage({ role: "assistant", text: answer }));

      await ChatService.saveMessage({
        chatbotId,

        sender: "user",

        content: text,
      });

      await ChatService.saveMessage({
        chatbotId,

        sender: "assistant",

        content: answer,
      });
    } catch (err) {
      console.error("Erro ao enviar pergunta:", err);

      dispatch(
        addMessage({ role: "assistant", text: "Erro ao obter resposta." })
      );
    }
  };

  useEffect(() => {
    const chatbotIdStorage = localStorage.getItem("selectedChatbotId");
    const fetchMessages = async () => {
      if (!chatbotIdStorage) return;

      try {
        const chatbotData = await MessageService.listMessageChatBots(
          chatbotIdStorage!
        );

        const rawMessages = chatbotData || [];

        const messagesFromBackend = rawMessages.map((m: Message) => ({
          role: m.sender === "assistant" ? "assistant" : "user",
          text: m.content ?? m.text ?? "",
        }));

        dispatch(setMessages(messagesFromBackend));
      } catch (err) {
        console.error("Erro ao carregar mensagens do chat:", err);
      }
    };

    fetchMessages();
  }, [chatbotIdStorage, dispatch]);

  return (
    <main className="flex h-screen bg-neutral-900">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <PDFUploader />

        {chatbotId && documentId && <ChatMessages messages={messages} />}

        {chatbotId && documentId && (
          <ChatInput onSendMessage={handleSendMessage} />
        )}
      </div>
    </main>
  );
}
