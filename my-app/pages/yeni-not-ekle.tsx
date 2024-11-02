import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

const GEMINI_API_ENDPOINT = "YOUR_GEMINI_API_ENDPOINT"; // Gemini API uç noktanız
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function YeniNotEkle() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(GEMINI_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Dönüştürülen metin:", data.transcribedText);
          setTranscribedText(data.transcribedText);
          setShowPopup(true); // Pop-up'ı aç
        } else {
          alert("Dosya yükleme sırasında bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
      }
    } else {
      alert("Lütfen bir dosya seçin veya sürükleyip bırakın!");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleCopyToClipboard = () => {
    if (transcribedText) {
      navigator.clipboard.writeText(transcribedText);
      alert("Metin kopyalandı!");
    }
  };

  const handleDownloadTextFile = () => {
    if (transcribedText) {
      const blob = new Blob([transcribedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notlar.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-8 flex flex-col items-center justify-center min-h-screen">
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-center mb-4">DERS NOTLARINIZI DİJİTALLEŞTİRİN</h1>
        <p className="text-lg text-center mb-8 mx-8 md:mx-16">
          Buraya ders notlarının fotoğraflarını yükleyebilirsiniz. Yüklediğiniz fotoğraflardaki notlar yapay zeka tarafından yazıya
          dönüştürülecek ve size kolay erişim için bir dosyada toplanacaktır. Bu sayede, ders notlarınızı dijital ortamda hızlıca
          düzenleyebilir ve saklayabilirsiniz.
        </p>

        {/* Dosya Yükleme Kutusu */}
        <div 
          className={`border ${dragging ? 'border-blue-500' : 'border-gray-300'} rounded-lg bg-white p-4 w-full max-w-lg`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center mb-2 w-full">
              <div className="relative w-full h-20 border-gray-400 flex items-center justify-center">
                <Image src="/images/uniai-icon.png" alt="Upload" width={30} height={30} className="absolute top-0" />
                <span className="font-bold">NOTLARINI SÜRÜKLE BIRAK</span>
              </div>
              <div className="my-2 text-center">veya</div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full text-center font-bold cursor-pointer">
                + Dosya Seç
              </label>
              <button
                onClick={handleFileUpload}
                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full font-bold"
              >
                Dosyayı Yükle
              </button>
            </div>
          </div>
        </div>

        {/* Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="font-bold mb-2">Dönüştürülen Metin</h2>
              <p className="mb-4">{transcribedText}</p>
              <div className="flex justify-between">
                <button 
                  onClick={handleCopyToClipboard} 
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Kopyala
                </button>
                <button 
                  onClick={handleDownloadTextFile} 
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  İndir
                </button>
                <button 
                  onClick={() => setShowPopup(false)} 
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}
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
          <form>
            <input
              type="text"
              placeholder="Selam! Nasıl yardımcı olabilirim?"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full font-bold">
              Gönder
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
