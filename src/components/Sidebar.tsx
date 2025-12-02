"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setChatbot, setChatbots } from "@/store/chatSlice";
import { CreateChatbotDto } from "@/dtos/create-chat.dto";
import { ChatService } from "@/services/chat.service";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { chatbots, selectedChatbotId } = useSelector(
    (state: RootState) => state.chat
  );

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("selectedChatbotId");
    if (savedId) {
      dispatch(setChatbot(savedId));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const data = await ChatService.list();
        console.log("Chatbots carregados:", data);
        dispatch(setChatbots(data));
      } catch (err) {
        console.error("Erro ao carregar chatbots:", err);
      }
    };
    fetchChatbots();
  }, [dispatch]);

  const handleCreateChatbot = async () => {
    if (!name) return alert("Nome obrigatório");

    const dto: CreateChatbotDto = { name, description };
    setLoading(true);
    try {
      const newBot = await ChatService.create(dto);
      dispatch(setChatbots([...chatbots, newBot]));
      dispatch(setChatbot(newBot.id));

      localStorage.setItem("selectedChatbotId", newBot.id);

      setOpenModal(false);
      setName("");
      setDescription("");
      alert("Chatbot criado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar chatbot:", err);
      alert("Falha ao criar chatbot. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 h-screen bg-neutral-900 text-neutral-300 p-6 flex flex-col border-r border-neutral-800">
      <button
        onClick={() => setOpenModal(true)}
        className="mb-4 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md"
      >
        + Novo Chat
      </button>

      <p className="mt-20 text-sm text-neutral-500">Seus Chatbots</p>

      <div className="flex flex-col gap-2">
        {chatbots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => {
              dispatch(setChatbot(bot.id));

              localStorage.setItem("selectedChatbotId", bot.id);
            }}
            className={`cursor-pointer px-3 py-2 rounded-md ${
              selectedChatbotId === bot.id
                ? "bg-red-600 text-white"
                : "hover:text-white"
            }`}
          >
            {bot.name}
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-neutral-900 p-6 rounded-lg w-80">
            <h2 className="text-white text-lg font-semibold mb-4">
              Criar Novo Chat
            </h2>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 rounded-md bg-neutral-800 text-white"
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 p-2 rounded-md bg-neutral-800 text-white"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-3 py-1 rounded-md hover:bg-neutral-700"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateChatbot}
                className={`px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
