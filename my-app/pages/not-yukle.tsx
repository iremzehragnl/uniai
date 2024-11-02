import { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showFileUploadPopup, setShowFileUploadPopup] = useState<boolean>(false); // Yeni state

  const toggleChat = () => {
    setShowChatbot(!showChatbot);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Dosya seçimini al
    if (file) {
      setImageFile(file); // Seçilen dosyayı state'e kaydet
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Dosya yüklendiğinde önizleme ayarla
      };
      reader.readAsDataURL(file); // Dosyayı oku ve base64 formatında döndür
    } else {
      setImagePreview(null); // Dosya yoksa önizlemeyi sıfırla
    }
  };

  const handleDownloadNotes = () => {
    const blob = new Blob([result || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notlar.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Lütfen bir resim yükleyin.");
      return;
    }
    
    if (!imagePreview) {
      alert("Resim önizlemesi bulunamadı. Lütfen resmi yükleyin.");
      return;
    }
  
    const imageBase64 = imagePreview.split(",")[1];
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
      setResult(response.response.text());
      setShowFileUploadPopup(false);
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoadingData(false);
      setShowFileUploadPopup(false); 
    }
  };

  const handleUniaiNotHazirla = () => {
    setChatbotResponse("");
    setShowChatbot(true);
  };

  const handleChatbotSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Lütfen aşağıdaki konu hakkında bilgi ver: ${subject}`;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    setIsSubmitting(true);
    setLoadingData(true);
    try {
      const response = await model.generateContent([prompt]);
      setChatbotResponse(response.response.text());
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoadingData(false);
      setIsSubmitting(false);
    }
  };

  const handleAddNotes = () => {
    if (chatbotResponse) {
      setResult((prev) => (prev ? `${prev}\n${chatbotResponse}` : chatbotResponse));
    }
    setShowChatbot(false);
    setChatbotResponse("");
  };

  const handleRetry = () => {
    setChatbotResponse("");
  };

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Not Yükle</h1>
        <div className="flex">
          <div className="flex-1 mr-8">
            <input type="text" placeholder="Not Başlığı" className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-lg font-semibold" />
            <textarea placeholder="Notunuzu buraya girin..." className="border border-gray-300 rounded-lg p-4 w-full h-[70vh] resize-none overflow-y-auto" value={result || ""} onChange={(e) => setResult(e.target.value)} />
            {imagePreview && (
              <img src={imagePreview} alt="Yüklenen Resim" className="border border-gray-300 rounded-lg mt-4" />
            )}
          </div>
          <div className="flex flex-col items-start space-y-4 mt-16 ml-4">
            <button className="bg-white text-green-600 font-bold border shadow-sm p-3 rounded-md w-80 hover:shadow-lg" onClick={() => setShowFileUploadPopup(true)}>
              Resimlerimden Not Çıkar
            </button>
            <button className="bg-green-600 shadow-sm text-white p-3 rounded-md w-80 hover:shadow-lg" onClick={handleUniaiNotHazirla}>
              UNIAI Not Hazırla
            </button>
              <div className="flex justify-end space-x-8">
                <button className="bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-600 w-32 mt-16 flex items-center justify-center space-x-2">
                  <Image 
                    src="/images/kaydet.png"
                    alt="Kaydet"
                    width={15} // İkonun genişliği
                    height={15} // İkonun yüksekliği
                  />
                 <span>Kaydet</span>
                </button>
                <button className="bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-600 w-40 mt-16 flex items-center justify-center space-x-2" onClick={handleDownloadNotes}>
                  <Image
                  src="/images/indir.png"
                  alt="indir"
                  width={25}
                  height={20}/>
                  <span>Notları İndir</span>
                </button>
              </div>
          </div>
        </div>
        

        {showFileUploadPopup && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" /> {/* Bulanık arka plan */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-between">
                <h2 className="text-lg font-bold">Resim Yükle</h2>
                <button className="text-gray-600" onClick={() => setShowFileUploadPopup(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 10.586L5.414 4 4 5.414 10.586 12 4 18.586 5.414 20 12 13.414 18.586 20 20 18.586 13.414 12 20 5.414 18.586 4 12 10.586z" />
                    </svg>
                  </button>
                  </div>
                <p className="text-sm text-gray-500 font-light">Lütfen bir resim yükleyin:</p>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="mt-3 border p-2 rounded" />
                {loadingData && (
        <div className="flex mb-4 mr-8">
          <p className="text-gray-700">Yükleniyor...</p>
        </div>
      )}
                <div className="flex justify-end mt-4">
                  <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full" onClick={handleImageUpload}>
                    Yükle
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {showChatbot && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" /> {/* Bulanık arka plan */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">UNIAI Not Hazırla</h2>
                  <button className="text-gray-600" onClick={toggleChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 10.586L5.414 4 4 5.414 10.586 12 4 18.586 5.414 20 12 13.414 18.586 20 20 18.586 13.414 12 20 5.414 18.586 4 12 10.586z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 font-light mr-7">Hakkında not çıkarmamı istediğin konuyu gir:</p>
                <form onSubmit={handleChatbotSubmit} className="mt-4">
                  <input
                    type="text"
                    placeholder="Konu.."
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-lg"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  {isSubmitting ? (
                    <p className="text-black flex items-center">Yükleniyor...</p>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 text-white font-normal p-2 rounded hover:bg-green-600 mb-4 w-full"
                    >
                      Not Hazırla
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
      <Chatbot />
    </div>
  );
}
