import { UploadDocumentResponse } from "@/dtos/document.dto";
import { api } from "@/lib/api";

export const DocumentService = {
  async upload(chatbotId: string, file: File): Promise<UploadDocumentResponse> {
    if (!chatbotId) {
      throw new Error("Selecione ou crie um chatbot antes de enviar PDFs.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chatbotId", chatbotId);

    const res = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload response:", res.data);
    return res.data as UploadDocumentResponse;
  },


  async process(id: string) {
    const res = await api.post(`/documents/${id}/process`);
    console.log("Process response:", res.data);
    return res.data; 
  },


  async generateEmbeddings(documentId: string, text?: string) {
    const res = await api.post(`/embeddings/${documentId}/generate`, {
      documentId,
      text,
    });
    return res.data;
  },

 
  async listByChatbot(chatbotId: string) {
    const res = await api.get(`/documents/chatbot/${chatbotId}`);
    return res.data;
  },


  async getOne(documentId: string) {
    const res = await api.get(`/documents/${documentId}`);
    return res.data;
  },

  async processDocument(chatbotId: string, formData: FormData) {
  return api.post(`/documents/${chatbotId}/process`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

};
