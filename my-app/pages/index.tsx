import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; image?: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const generateQuestions = async () => {
    const prompt = "Yazılım ve teknoloji hakkında iki kısa soru oluştur. Başka bir şey yazma";
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
    <div className="flex">
      {/* Sidebar */}
      <nav className="flex flex-col items-start bg-white border-r border-gray-300 h-screen p-4">
        <div className="mb-8">
          <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
        </div>
        <ul className="space-y-4 text-lg font-normal">
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="#" className="flex items-center">
              <Image src="/images/gozat-icon.png" alt="Göz At" width={20} height={20} className="mr-2" />
              Göz At
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="/kurslarim" className="flex items-center">
              <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
              Kurslarım
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="/not-defterim" className="flex items-center">
              <Image src="/images/notebook-icon.png" alt="Not Defterim" width={20} height={20} className="mr-2" />
              Not Defterim
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500" onClick={toggleChat}>
            <Link href="#" className="flex items-center">
              <Image src="/images/uniai-icon.png" alt="Uniai" width={28} height={28} className="mr-2" />
              Uniai
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-8">
        {/* Fotoğraf Kutucuğu */}
        <div className="mb-8 text-center">
          <div className="photo-box relative w-full h-40 overflow-hidden mb-4">
            <Image
              src="/images/welcome.png"
              alt="Kurs Fotoğrafı"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        {/* Kurslar */}
        <div className="grid grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/math-course.jpg"
                alt="Math Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Math 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/python-course.webp"
                alt="Python Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Python 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/javascript-course.png"
                alt="JavaScript Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">JavaScript 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/web-development-course.jpg"
                alt="Web Development"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Web Development</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>
        </div>
      </main>

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
                <p
                  key={index}
                  className="text-black-600 cursor-pointer hover:underline mb-1"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </p>
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
                <div className={`p-2 rounded-lg text-white ${message.sender === "user" ? "bg-blue-500" : "bg-gray-500"}`}>
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
              placeholder="Your message..."
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
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
