import { useState } from "react";
import Image from "next/image";

export default function Home() {
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
        <ul className="space-y-4 text-lg font-normal"> {/* Yazı boyutu büyütüldü */}
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <a href="#" className="flex items-center">
              <Image src="/images/gozat-icon.png" alt="Göz At" width={20} height={20} className="mr-2" />
              Göz At
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <a href="#" className="flex items-center">
              <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
              Kurslarım
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <a href="#" className="flex items-center">
              <Image src="/images/notebook-icon.png" alt="Not Defterim" width={20} height={20} className="mr-2" />
              Not Defterim
            </a>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500" onClick={toggleChat}>
            <a href="#" className="flex items-center">
              <Image src="/images/chat-icon.png" alt="Uniai" width={20} height={20} className="mr-2" />
              Uniai
            </a>
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
              src="/images/course-banner.jpg" // Buraya istediğin fotoğrafın yolunu ekle
              alt="Kurs Fotoğrafı"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        {/* Kurslar */}
        <div className="grid grid-cols-2 gap-8">
          {/* Kurs Kutuları */}
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
          <div className="h-48 overflow-y-auto">
            <p>Merhaba! Size nasıl yardımcı olabilirim?</p>
          </div>
          <input
            type="text"
            placeholder="Mesaj yazın..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      )}
    </div>
  );
}
