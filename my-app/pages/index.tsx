import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleGenerativeAI, HarmCategory,HarmBlockThreshold,} from "@google/generative-ai";


const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [chatData, setChatData] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  const generateQuestions = async () => {
    const prompt = "Yazılım ve teknoloji hakkında iki kısa soru oluştur. Soru dışında başka bir şey yazma. soruların başında boşluk bırak, hiçbir şey olmasın.";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([prompt]);
    const questionsArray = result.response.text().split('\n').filter(q => q.trim() !== '');

    setQuestions(questionsArray);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

 

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result?.toString().split(",")[1] || null);
      setUploadedFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImageBase64(null);
    setUploadedFileName(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = inputValue || "Bu görseli açıkla, ve not şeklinde çıkart. Başka hiçbir şey yazma.";
    setLoadingData(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const contentData = imageBase64
      ? [
          prompt,
          {
            inlineData: {
              data: imageBase64,
              mimeType: "image/jpeg",
            },
          },
        ]
      : [prompt];

    const result = await model.generateContent(contentData);
    setChatData((prev) => `${prev}<br>${result.response.text()}`);
    setLoadingData(false);
  };

  // Yeni fonksiyon: Sorulara tıklama olayı
  const handleQuestionClick = async (question: string) => {
    setInputValue(question);
    setLoadingData(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([question]);
    setChatData((prev) => `${prev}<br>${result.response.text()}`);
    setLoadingData(false);
  };
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
      <nav className="flex flex-col items-start bg-white border-r border-gray-300 h-screen p-4">
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

      <div
        className="fixed bottom-8 right-8 bg-red-500 rounded-full p-6 cursor-pointer transition-transform transform hover:scale-110"
        onClick={toggleChat}
      >
        <Image
          src="/images/chatbot-icon.png"
          alt="Chatbot"
          width={30}
          height={30}
        />
      </div>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-80 max-h-96 overflow-y-auto transition-all duration-300 transform translate-y-0 opacity-100">
          <h2 className="font-bold text-lg mb-2 text-center"> UniAI</h2>
          <div className="border-b border-gray-300 pb-2 mb-2">
            {questions.length > 0 && (
              <div className="flex flex-col mb-2">
                {questions.map((question, index) => (
                  <p
                    key={index}
                    className="text-black-600 cursor-pointer hover:underline "
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </p>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Selam! Nasıl yardımcı olabilirim?"
              name="prompt"
              className="border border-gray-300 rounded-lg p-2 w-full mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex items-center mb-2">
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Image
                  src="/images/attachment-icon.png"
                  alt="Ataç"
                  width={24}
                  height={24}
                  className="mr-2 hover:opacity-70 transition-opacity"
                />
              </label>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold shadow transition-transform transform hover:scale-105"
                style={{ width: '80px', height: '36px' }}
              >
                Gönder
              </button>
            </div>
            {uploadedFileName && (
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">Yüklenen dosya: <span className="font-medium">{uploadedFileName}</span></p>
                <button 
                  type="button" 
                  onClick={handleImageRemove} 
                  className="text-red-500 hover:underline"
                >
                  Sil
                </button>
              </div>
            )}
          </form>
          <div className="mt-4">
            {loadingData && (
              <div className="flex justify-center mb-2">
                <span className="loader">Yükleniyor...</span>
              </div>
            )}
            {chatData && (
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: chatData }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}