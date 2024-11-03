import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; image?: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  

  const generateQuestions = async () => {
    const prompt = "Yazılım ve teknoloji hakkında iki kısa soru oluştur. soruların önündeki cümleyi, sayıları ve sembolleri yok et. soruların önünde sadece boşluk olsun. soruların önüne hiçbir şey koyma";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([prompt]);
    const questionsArray = result.response.text().split('\n').filter(q => q.trim() !== '');
    setQuestions(questionsArray);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (textToSubmit: string, image?: string | null) => {
    if (!textToSubmit.trim() && !image) return;

    const userMessage = { text: textToSubmit, sender: "user", image: image ? `data:image/jpeg;base64,${image}` : undefined };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setImageBase64(null);
    setLoading(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const contentData = image
      ? [
          textToSubmit || "Bu görseli yorumla.",
          {
            inlineData: {
              data: image,
              mimeType: "image/jpeg",
            },
          },
        ]
      : [textToSubmit];

    const result = await model.generateContent(contentData);
    const botMessage = { text: result.response.text(), sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result?.toString().split(",")[1] || null);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImageBase64(null);
  };

  const handleQuestionClick = (question: string) => {
    handleSubmit(question);
  };

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat Icon */}
      <div
        className="fixed bottom-8 right-8 bg-red-500 rounded-full p-6 cursor-pointer transition-transform transform hover:scale-110"
        onClick={toggleChat}
      >
        <Image src="/images/chatbot-icon.png" alt="Chatbot" width={30} height={30} />
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-80 max-h-96 overflow-y-auto">
          <h2 className="font-bold text-lg mb-2 text-center">UniAI</h2>

          {/* Suggested Questions */}
          {questions.length > 0 && (
            <div className="flex flex-col mb-2">
              {questions.map((question, index) => (
                <button
                  key={index}
                  className="bg-cyan-400 rounded text-white cursor-pointer mb-1 p-2 hover:bg-cyan-300 "
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Message Bubbles */}
          <div className="flex flex-col space-y-2 mb-4 max-h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${message.sender === "user" ? "justify-end" : ""}`}>
                {message.image && (
                  <div className="relative w-16 h-16">
                    <img src={message.image} alt="Uploaded" className="w-full h-full rounded-lg border" />
                  </div>
                )}
                <div className={`p-2 rounded-lg ${message.sender === "user" ? "text-white bg-cyan-600" : "text-gray-500 bg-white border border-gray-200"}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(inputValue, imageBase64);
            }}
            className="flex flex-col"
          >
            <input
              type="text"
              placeholder="UniAI'a soru sor.."
              className="border border-gray-300 rounded-lg p-2 mb-2 flex-grow"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="relative mb-2">
              {imageBase64 && (
                <div className="flex items-center border p-2 rounded-lg relative">
                  <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Preview" className="w-12 h-12 rounded mr-2" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={handleDeleteImage}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer mr-2">
                <Image
                  src="/images/attachment-icon.png"
                  alt="Attach"
                  width={24}
                  height={24}
                />
              </label>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
                disabled={loading}
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
