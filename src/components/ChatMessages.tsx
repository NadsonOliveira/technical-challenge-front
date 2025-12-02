"use client";

import { FaFilePdf } from "react-icons/fa";

interface Message {
  role: "user" | "assistant" | "system";
  text: string;
  type?: "text" | "pdf";
  documentId?: string;
}

export default function ChatMessages({ messages }: { messages: Message[] }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-8 py-6 text-neutral-300">
        <div className="text-center text-neutral-500 mt-10">
          <FaFilePdf className="text-3xl mx-auto mb-2" />
          Olá! Me envie um PDF para começar.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 text-neutral-300 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          {msg.type === "pdf" ? (
            <div className="flex items-center gap-2 text-blue-400">
              <FaFilePdf />
              <span>{msg.text}</span>
            </div>
          ) : (
            <div
              className={`p-2 rounded ${
                msg.role === "user" ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
