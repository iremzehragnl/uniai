import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Kurslarim() {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
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
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500 text-green-500">
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

      <main className="flex-1 p-8">
        {/* Arama Çubuğu */}
        <input
          type="text"
          placeholder="Kurs Ara..."
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />

        <h1 className="text-2xl font-bold mb-6">Kurslarım</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kutucuk 1 */}
          <div className="border rounded-lg shadow-md flex flex-col">
            <div className="relative w-full h-32">
              <Image
                src="/images/course-img1.png" // Örnek kurs resmi
                alt="Kurs 1"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4 flex-grow">
              <h3 className="text-lg font-bold">Kurs 1</h3>
              <p className="text-sm">Eğitmen: Eğitmen 1</p>
              <div className="flex space-x-2 mt-auto">
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Başla/Devam Et
                </button>
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Not Yükle
                </button>
              </div>
            </div>
          </div>

          {/* Kutucuk 2 */}
          <div className="border rounded-lg shadow-md flex flex-col">
            <div className="relative w-full h-32">
              <Image
                src="/images/course-img2.png" // Örnek kurs resmi
                alt="Kurs 2"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4 flex-grow">
              <h3 className="text-lg font-bold">Kurs 2</h3>
              <p className="text-sm">Eğitmen: Eğitmen 2</p>
              <div className="flex space-x-2 mt-auto">
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Başla/Devam Et
                </button>
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Not Yükle
                </button>
              </div>
            </div>
          </div>

          {/* Kutucuk 3 */}
          <div className="border rounded-lg shadow-md flex flex-col">
            <div className="relative w-full h-32">
              <Image
                src="/images/course-img3.png" // Örnek kurs resmi
                alt="Kurs 3"
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-4 flex-grow">
              <h3 className="text-lg font-bold">Kurs 3</h3>
              <p className="text-sm mb-5">Eğitmen: Eğitmen 3</p>
              <div className="flex space-x-4 mt-auto">
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Başla/Devam Et
                </button>
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                  Not Yükle
                </button>
              </div>
            </div>
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Selam! Nasıl yardımcı olabilirim?"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full font-bold">
              Gönder
            </button>
          </form>
          <div className="mt-4">
            {/* Chat verileri burada gösterilecek */}
          </div>
        </div>
      )}
    </div>
  );
}

