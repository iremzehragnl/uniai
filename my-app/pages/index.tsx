import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Link bileşenini ekleyin
import Navbar from "../components/Navbar";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [chatData, setChatData] = useState<string>("");

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  async function runChat(prompt: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setChatData(response.text());
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = (event.target as HTMLFormElement)?.prompt?.value || "";
    runChat(prompt);
  };

  return (
    <div className="flex">
      {/* Sol Navbar */}
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
        {/* Arama Çubuğu */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Arama..."
            className="border border-gray-300 rounded-lg p-2 w-1/2"
          />
        </div>

        {/* Fotoğraf Kutucuğu */}
        <div className="mb-8 text-center">
          <div className="photo-box relative w-full h-40 overflow-hidden mb-4">
            <Image
              src="/images/course-banner.jpg"
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

      {/* Chatbot İkonu */}
      <div
        className="fixed bottom-8 right-8 bg-red-500 rounded-full p-6 cursor-pointer"
        onClick={toggleChat}
      >
        <Image 
          src="/images/chatbot-icon.png" 
          alt="Chatbot"
          width={30}
          height={30}
        />
      </div>

      {/* Chatbot Sohbeti */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
          <h2 className="font-bold mb-2">Sohbet Botu</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Selam! Nasıl yardımcı olabilirim?"
              name="prompt"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full font-bold">
              Gönder
            </button>
          </form>
          <div className="mt-4">
            {chatData && <div dangerouslySetInnerHTML={{ __html: chatData }} />}
          </div>
        </div>
      )}
    </div>
  );
}
