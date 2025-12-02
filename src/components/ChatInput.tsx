"use client";

import { useState } from "react";

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="border-t border-neutral-800 p-6 flex gap-3 bg-neutral-900">
      <textarea
        disabled={disabled}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1 bg-neutral-800 disabled:opacity-50 text-white p-4 rounded-xl resize-none h-24 outline-none border border-neutral-700"
      />

      <button
        disabled={disabled}
        onClick={handleSend}
        className="w-32 bg-red-600 hover:bg-red-500 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white rounded-xl px-4 cursor-pointer"
      >
        Enviar
      </button>
    </div>
  );
}
