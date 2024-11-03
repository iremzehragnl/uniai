import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link"; 
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";

export default function Kurslarim() {
  const [isChatOpen, setChatOpen] = useState(false);
  const router = useRouter();

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleNotYukle = (kursId: string) => {
    router.push(`/not-yukle?kursId=${kursId}`);
  };

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-8">
        {/* Arama Çubuğu */}
        <input
          type="text"
          placeholder="    Kurs Ara..."
          className="border border-gray-300 rounded-lg p-2 mb-4 w-2/5"
        />

        <h1 className="text-2xl font-bold mb-6">Kurslarım</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kurs Kutucukları */}
          {[1, 2, 3].map((kursId) => (
            <div key={kursId} className="border rounded-lg shadow-md flex flex-col">
              <div className="relative w-full h-32">
                <Image
                  src={`/images/kurs.webp`} 
                  alt={`Kurs ${kursId}`}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-4 flex-grow">
                <h3 className="text-lg font-bold">{`Kurs ${kursId}`}</h3>
                <p className="text-sm mb-2">Eğitmen: Eğitmen {kursId}</p>
                <div className="flex space-x-2 mt-auto">
                  <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40 mt-2">
                    Başla/Devam Et
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40 mt-2"
                    onClick={() => handleNotYukle(kursId.toString())}
                  >
                    Not Yükle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Chatbot />

    </div>
  );
}
