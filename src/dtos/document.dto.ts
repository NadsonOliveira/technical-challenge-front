export interface UploadDocumentResponse {
  id?:string;
  textContent?: string;
  content: string;
  originalName?: string;
  sender: "user" | "assistant" | "system";
  filename?: string;
  documentId?: string;
}
