"use client"

import { useState, FormEvent, useRef, useEffect } from "react";
import { askCarBot, Car } from "../utils/api";

interface Message {
  role: "user" | "bot";
  content: string;
  cars?: Car[];
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askCarBot(input);
      const botMessage: Message = {
        role: "bot",
        content: response.message,
        cars: response.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0B0F19] bg-gradient-to-b from-[#0B0F19] via-[#0C1324] to-[#0B0F19] text-gray-200 p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">Car Sales Chatbot</h1>
      <div className="relative w-full max-w-3xl bg-[#0D1220]/70 backdrop-blur-xl border border-sky-500/20 shadow-[0_0_40px_-12px_rgba(56,189,248,0.5)] rounded-2xl flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`group flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-sky-600/80 shadow-[0_0_20px_rgba(56,189,248,0.45)]" : "bg-[#151A2B] border border-white/10"}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" className={`${msg.role === "user" ? "text-white" : "text-sky-400"}`}>
                    <path fill="currentColor" d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0" />
                  </svg>
                </div>
                <div className={`p-4 rounded-xl max-w-[78%] transition-colors ${msg.role === "user"
                    ? "bg-gradient-to-br from-sky-600 to-sky-500 text-white shadow-[0_0_30px_-8px_rgba(56,189,248,0.6)]"
                    : "bg-[#121826] text-gray-200 border border-white/10"
                  }`}>
                  <p className="leading-relaxed">{msg.content}</p>

                  {msg.cars && msg.cars.length > 0 && (
                    <div className="mt-4 grid gap-3">
                      {msg.cars.map((car, idx) => (
                        <div key={idx} className="rounded-lg border border-sky-500/25 bg-[#0C1424] p-3 shadow-[0_0_24px_-10px_rgba(56,189,248,0.35)] hover:border-sky-400/40 hover:shadow-[0_0_34px_-10px_rgba(56,189,248,0.5)] transition">
                          <p className="font-semibold text-gray-100">
                            {car.manufacturer} {car.model} ({car.year})
                          </p>
                          <p className="text-sm text-gray-300">Engine: {car.engine} | Fuel: {car.fuel}</p>
                          <p className="text-sm text-gray-300">Mileage: {car.mileage} | Price: ₱{car.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#151A2B] border border-white/10" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121826] border border-white/10">
                <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400" style={{ animationDelay: "120ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400" style={{ animationDelay: "240ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-white/10 p-4 bg-[#0D1220]/70 backdrop-blur-xl">
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl bg-[#0B1220] text-gray-200 placeholder-gray-400 border border-[#1F2A44] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60 outline-none transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a car..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="relative rounded-xl px-5 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-[0_10px_30px_-10px_rgba(56,189,248,0.8)] hover:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.95)] hover:from-sky-500 hover:to-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
