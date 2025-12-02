"use client";

import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocumentService } from "@/services/document.service";
import { setDocument } from "@/store/chatSlice";
import { RootState, AppDispatch } from "@/store";
import axios from "axios";
import { addMessageToChat } from "@/store/MessageSlice";

export default function PDFUploader() {
  const dispatch = useDispatch<AppDispatch>();
  const chatbotId = useSelector(
    (state: RootState) => state.chat.selectedChatbotId
  );

  const [loading, setLoading] = useState(false);

  const handleFullUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!chatbotId) {
      alert("Selecione ou crie um chatbot antes de enviar PDFs.");
      return;
    }

    setLoading(true);

    try {
      const uploadResult = await DocumentService.upload(chatbotId, file);
      const documentId = uploadResult.id;
      const textFiles = uploadResult.originalName;

      if (!documentId) throw new Error("Documento não retornou do backend");

      // Salvar documento selecionado no chat
      dispatch(setDocument(documentId));

      const embeddingResult = await DocumentService.generateEmbeddings(
        documentId,
        textFiles
      );
      console.log("Embeddings gerados:", embeddingResult);

      dispatch(
        addMessageToChat({
          chatbotId,
          message: {
            role: "assistant",
            text: textFiles || "PDF enviado e processado.",
            type: "pdf",
            documentId,
          },
        })
      );

      alert("PDF enviado, processado e embeddings gerados com sucesso!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Erro:", err.message);
      } else if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else {
        console.error("Erro desconhecido:", err);
      }
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="p-4 border-b border-neutral-800 bg-neutral-900">
      <label
        className={`cursor-pointer text-red-500 hover:text-red-400 ${
          !chatbotId ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Enviando PDF..." : "Enviar PDF"}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFullUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
