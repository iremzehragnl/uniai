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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Yeni state

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
  const handleDownloadNotes = () => {
    const blob = new Blob([result || ""], { type: "text/plain" }); // Notları içeren bir Blob oluştur
    const url = URL.createObjectURL(blob); // Blob'dan bir URL oluştur
    const a = document.createElement("a"); // Yeni bir <a> elementi oluştur
    a.href = url; // URL'yi <a> elementinin href'ine ata
    a.download = "notlar.txt"; // İndirilecek dosya adı
    document.body.appendChild(a); // <a> elementini body'ye ekle
    a.click(); // <a> elementine tıkla (indirme işlemini başlat)
    document.body.removeChild(a); // <a> elementini body'den kaldır
    URL.revokeObjectURL(url); // Belleği temizle
};


  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Lütfen bir resim yükleyin.");
      return;
    }
    const imageBase64 = imagePreview.split(",")[1]; // Base64 verisi
    const prompt = "Lütfen bu görseldeki yazıları bir texte çevirin. Ve görsel hakkında bilgi ver";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    setLoadingData(true);
    try {
      const contentData = [
        prompt,
        { inlineData: { data: imageBase64, mimeType: "image/jpeg" } },
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

  const handleChatbotSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Lütfen aşağıdaki konu hakkında bilgi ver: ${subject}`;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    setIsSubmitting(true); // Butonu kaldırmak için true yap
    setLoadingData(true);
    try {
      const response = await model.generateContent([prompt]);
      setChatbotResponse(response.response.text()); // Yanıtı state'e ata
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoadingData(false);
      setIsSubmitting(false); // Yanıt geldikten sonra butonu geri getir
    }
  };

  const handleAddNotes = () => {
    if (chatbotResponse) {
      setResult((prev) => (prev ? `${prev}\n${chatbotResponse}` : chatbotResponse)); // Yeni yanıtı ekle
    }
    setShowChatbot(false); // Chatbotu kapat
    setChatbotResponse(""); // Cevabı sıfırla
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
              <Image src="/images/uniai-icon.png" alt="UNIAI" width={28} height={28} className="mr-2" />
              UNIAI
            </a>
          </li>
        </ul>
      </nav>

      {/* Ana İçerik */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Not Yükle</h1>
        <div className="flex">
          {/* Sol: Başlık ve Not Kutusu */}
          <div className="flex-1 mr-8">
            <input type="text" placeholder="Not Başlığı" className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-lg font-semibold" />
            <textarea placeholder="Notunuzu buraya girin..." className="border border-gray-300 rounded-lg p-4 w-full h-[70vh] resize-none overflow-y-auto" value={result || ""} onChange={(e) => setResult(e.target.value)} />
            {imagePreview && (
              <img src={imagePreview} alt="Yüklenen Resim" className="border border-gray-300 rounded-lg mt-4 w-full/2" />
            )}
          </div>
          {/* Sağ: Butonlar */}
          <div className="flex flex-col items-start space-y-4 mt-16 ml-4">
            <button className="bg-green-500 text-white p-3 rounded-md w-80 hover:bg-green-600" onClick={handleImageUpload}>
              
              Resimlerimden Not Çıkar
            </button>
            <button className="bg-green-500 text-white p-3 rounded-md w-80 hover:bg-green-600" onClick={handleUniaiNotHazirla}>
              UNIAI Not Hazırla
            </button>
            <div className="space-y-2">
              <label className="flex items-center mt-16">
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                <span className="bg-gray-200 text-gray-700 p-2 rounded-md w-32 text-center cursor-pointer hover:bg-gray-300">Dosya Ekle</span>
              </label>
              <button className="bg-gray-200 text-gray-700 p-2 rounded-md w-32 hover:bg-gray-300">Ses Ekle</button>
              <div className="flex justify-end mt-16">
                <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 w-32 mt-16">Kaydet</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-16">
  <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 w-32 mt-16" onClick={handleDownloadNotes}>
    Notları İndir
  </button>
  
</div>


        {/* UNIAI Arayüzü */}
        {showChatbot && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" /> {/* Bulanık arka plan */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">UNIAI</h2>
                  <button className="text-gray-600" onClick={toggleChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 10.586L5.414 4 4 5.414 10.586 12 4 18.586 5.414 20 12 13.414 18.586 20 20 18.586 13.414 12 20 5.414 18.586 4 12 10.586z" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleChatbotSubmit} className="mt-4">
                  <input
                    type="text"
                    placeholder="Sorunuz..."
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-lg"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  {isSubmitting ? (
                    <p className="text-black flex items-center">Yükleniyor...</p>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4 w-full"
                    >
                      Sor
                    </button>
                  )}
                </form>
                {loadingData && !isSubmitting && (
                  <p className="text-black flex items-center">Yükleniyor...</p>
                )}
                {chatbotResponse && (
                  <div className="mt-4">
                    <div className="h-32 overflow-y-auto border border-gray-300 p-2 rounded">
                      <p>{chatbotResponse}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={handleAddNotes}>
                        Evet, notlarıma ekle
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={handleRetry}>
                        Yeniden Sor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
