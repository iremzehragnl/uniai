import { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "@/components/navbar";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function NotYukle() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile || !imagePreview) {
      alert("Lütfen bir resim yükleyin.");
      return;
    }

    const imageBase64 = imagePreview.split(",")[1];
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    setLoading(true);
    try {
      const response = await model.generateContent([
        "Lütfen bu görseldeki yazıları bir texte çevirin.",
        { inlineData: { data: imageBase64, mimeType: "image/jpeg" } }
      ]);
      setTranscribedText(response.response.text());
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadNotes = () => {
    if (transcribedText) {
      const blob = new Blob([transcribedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notlar.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 p-10 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-1 text-center flex items-center justify-center">
  <Image
    src="/images/uniai-icon.png"
    alt="UniAI Icon"
    width={80} 
    height={80} 
    className="mr" 
  />
  Ders Notlarınızı Dijitalleştirin
</h1>


        

        <p className="text-center mb-4 max-w-2xl mx-auto">
          Buraya ders notlarının fotoğraflarını yükleyebilirsiniz. Yüklediğiniz fotoğraflardaki notlar yapay zeka tarafından yazıya
          dönüştürülecek ve size kolay erişim için bir dosyada toplanacaktır. Bu sayede, ders notlarınızı dijital ortamda hızlıca
          düzenleyebilir ve saklayabilirsiniz.
        </p>

        <div className="flex flex-col items-center">
          <label className="flex items-center border p-2 rounded w-full cursor-pointer">
            <Image
              src="/images/attachment-icon.png" 
              alt="Dosya Seç"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            Dosya Seç
          </label>
        </div>

        {imagePreview && (
          <div className="relative mt-4">
            <img src={imagePreview} alt="Yüklenen Resim" className="rounded shadow" />
            <button 
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-lg text-black">
              &times; {/* Çarpı simgesi */}
            </button>
          </div>
        )}

        <button
          className="bg-green-500 text-white p-2 rounded mt-4 w-full transition hover:bg-green-600"
          onClick={handleImageUpload}
          disabled={loading}
        >
          {loading ? "Notlarınız dijitalleştiriliyor.." : "Notları dijitalleştir"}
        </button>

        {transcribedText && (
          <div className="mt-4">
            <textarea
              className="border p-2 w-full h-32 rounded"
              value={transcribedText}
              readOnly
            />
          </div>
        )}

        <button
          className="bg-cyan-500 text-white p-3 rounded mt-4 w-full transition hover:bg-cyan-600 flex items-center justify-center"
          onClick={handleDownloadNotes}
        >
          Notları İndir
          <Image
            src="/images/indir.png" 
            alt="İndir"
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
      </main>
    </div>
  );
}
