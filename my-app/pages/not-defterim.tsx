import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router"; 
import Link from "next/link";
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";

export default function NotDefterim() {
  const router = useRouter(); 
  const [isChatOpen, setChatOpen] = useState(false);
  
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleNewNote = () => {
    router.push('/yeni-not-ekle'); 
  };

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-8">
      <input
          type="text"
          placeholder="    Not ara..."
          className="border border-gray-300 rounded-lg p-2 mb-4 w-2/5"
        />
        <h1 className="text-2xl font-bold mb-6">Not Defterim</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kutucuk 1 */}
          <div className="border rounded-lg shadow-md flex w-full h-64">
            <div className="relative w-1/3 h-full">
              <Image
                src="/images/note-img.png" 
                alt="Not 1"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4 w-25">
              <h3 className="font-bold">Not 1</h3>
              <p className="text-sm">Düzenlenme Tarihi: 01/01/2024</p>
              <button 
  onClick={() => router.push(`/not-yukle?noteId=1`)} // Not 1 için
  className="mt-auto bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
>
  Not Ekle/Düzenle
</button>

            </div>
          </div>
          {/* Kutucuk 2 */}
          <div className="border rounded-lg shadow-md flex w-full h-64">
            <div className="relative w-1/3 h-full">
              <Image
                src="/images/note-img.png" 
                alt="Not 2"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4 w-25">
              <h3 className="font-bold">Not 2</h3>
              <p className="text-sm">Düzenlenme Tarihi: 02/01/2024</p>
              <button 
  onClick={() => router.push(`/not-yukle?noteId=2`)} // Not 2 için
  className="mt-auto bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
>
  Not Ekle/Düzenle
</button>

            </div>
          </div>
        </div>

        {/* Yeni Not Ekle Butonu */}
        <div className="mt-12 text-center flex justify-start">
            <Link href="/yeni-not-ekle">
            <button
  onClick={handleNewNote}
  className="flex flex-col items-center mt-4 bg-white border border-green-600 text-green-600 font-bold px-8 p-2 shadow-lg rounded-full hover:shadow-lg transform hover:scale-105 transition duration-200 h-13"
>
            <Image 
    src="/images/uniai-icon.png"
    alt="Yeni Not Ekle"
    width={20} 
    height={20} 
    className="mr-2" 
  />
            Yeni Not Ekle
          </button>
          </Link>
        </div>
      </main>
      <Chatbot />

    </div>
  );
}
