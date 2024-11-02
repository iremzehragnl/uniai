import { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash"; // Model adı
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string; // API anahtarı

export default function NotYukle() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const toggleChat = () => {
    setShowChatbot(!showChatbot);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Lütfen bir resim yükleyin.");
      return;
    }

    const imageBase64 = imagePreview.split(",")[1]; // Base64 verisi

    const prompt = "Lütfen bu resimdeki yazıları bir texte çevirin.";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    setLoadingData(true);
    try {
      const contentData = [
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: "image/jpeg",
          },
        },
      ];

      const response = await model.generateContent(contentData);
      setResult(response.response.text()); // Sonucu state'e ata
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleUniaiNotHazirla = () => {
    setChatbotResponse(""); // Önceki cevabı sıfırla
    setShowChatbot(true); // Chatbotu aç
  };

  const handleChatbotSubmit = (e) => {
    e.preventDefault();
    const simulatedResponse = `Bu konu için ders notları: ${subject} ile ilgili bilgiler...`;
    setChatbotResponse(simulatedResponse);
  };

  const handleAddNotes = () => {
    setShowChatbot(false); // Chatbotu kapat
  };

  const handleRetry = () => {
    setChatbotResponse(""); // Cevabı sıfırla
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
            <a href="/" className="flex items-center">
              <Image src="/images/gozat-icon.png" alt="Göz At" width={20} height={20} className="mr-2" />
              Göz At
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <a href="/kurslarim" className="flex items-center">
              <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
              Kurslarım
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <a href="/not-defterim" className="flex items-center">
              <Image src="/images/notebook-icon.png" alt="Not Defterim" width={20} height={20} className="mr-2" />
              Not Defterim
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500" onClick={toggleChat}>
            <a href="#" className="flex items-center">
              <Image src="/images/uniai-icon.png" alt="Uniai" width={28} height={28} className="mr-2" />
              Uniai
            </a>
          </li>
        </ul>
      </nav>

      {/* Ana İçerik */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6 ">Not Yükle</h1>
        <div className="flex">
          {/* Sol: Başlık ve Not Kutusu */}
          <div className="flex-1 mr-8">
            <input
              type="text"
              placeholder="Not Başlığı"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-lg font-semibold"
            />
            <textarea
              placeholder="Notunuzu buraya girin..."
              className="border border-gray-300 rounded-lg p-4 w-full h-[70vh] resize-none"
              value={result || ""} // Sonucu textarea'ya yaz
              onChange={(e) => setResult(e.target.value)} // Kullanıcı değişiklik yapabilsin
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Yüklenen Resim"
                className="border border-gray-300 rounded-lg mt-4 w-full/2"
              />
            )}
            {loadingData && <p>Yükleniyor...</p>}
          </div>

          {/* Sağ: Butonlar */}
          <div className="flex flex-col items-start space-y-4 mt-16 ml-4">
            <button className="bg-green-500 text-white p-3 rounded-md w-80 hover:bg-green-600" onClick={handleImageUpload}>
              Resimlerimden Not Çıkar
            </button>
            <button className="bg-green-500 text-white p-3 rounded-md w-80 hover:bg-green-600" onClick={handleUniaiNotHazirla}>
              Uniai Not Hazırla
            </button>
            <div className="space-y-2">
              <label className="flex items-center mt-16">
                <input 
                  type="file" 
                  className="hidden"
                  accept=".jpg,.jpeg,.png" 
                  onChange={handleFileChange}
                />
                <span className="bg-gray-200 text-gray-700 p-2 rounded-md w-32 text-center cursor-pointer hover:bg-gray-300">
                  Dosya Ekle
                </span>
              </label>
              <button className="bg-gray-200 text-gray-700 p-2 rounded-md w-32 hover:bg-gray-300">
                Ses Ekle
              </button>
              <div className="flex justify-end mt-16">
          <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 w-32 mt-16">
            Kaydet
          </button>
        </div>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        

        {/* Chatbot Arayüzü */}
        {showChatbot && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" /> {/* Bulanık arka plan */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="font-bold mb-2">Chatbot</h2>
                <form onSubmit={handleChatbotSubmit}>
                  <input
                    type="text"
                    placeholder="Özet çıkarmamı istediğin konu nedir?"
                    className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full font-bold">
                    Sor
                  </button>
                </form>
                {chatbotResponse && (
                  <div className="mt-4">
                    <p className="font-bold">Chatbot Cevabı:</p>
                    <p>{chatbotResponse}</p>
                    <div className="flex justify-between mt-4">
                      <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={handleAddNotes}>
                        Evet, notlarıma ekle
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={handleRetry}>
                        Hayır, tekrar not hazırla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Chatbot İkonu */}
      <div
        className="fixed bottom-8 right-8 bg-red-500 rounded-full p-6 cursor-pointer shadow-lg transition-all duration-300 hover:scale-110"
        onClick={toggleChat}
      >
        <Image src="/images/chatbot-icon.png" alt="Chatbot" width={40} height={40} />
      </div>
    </div>
  );
}
