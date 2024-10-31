import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link"; // Link bileşenini içe aktarın

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
      {/* Sol Navbar */}
      <nav className="flex flex-col items-start bg-white border-r border-gray-300 h-screen p-4">
        <div className="mb-8">
          <Link href="/" passHref>
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
          </Link>
        </div>
        <ul className="space-y-4 text-lg font-normal">
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="/">
              <div className="flex items-center">
                <Image src="/images/gozat-icon.png" alt="Göz At" width={20} height={20} className="mr-2" />
                Göz At
              </div>
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500 text-green-500">
            <Link href="/kurslarim">
              <div className="flex items-center">
                <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
                Kurslarım
              </div>
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="/not-defterim">
              <div className="flex items-center">
                <Image src="/images/notebook-icon.png" alt="Not Defterim" width={20} height={20} className="mr-2" />
                Not Defterim
              </div>
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500" onClick={toggleChat}>
            <div className="flex items-center">
              <Image src="/images/uniai-icon.png" alt="Uniai" width={28} height={28} className="mr-2" />
              Uniai
            </div>
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
          {/* Kurs Kutucukları */}
          {[1, 2, 3].map((kursId) => (
            <div key={kursId} className="border rounded-lg shadow-md flex flex-col">
              <div className="relative w-full h-32">
                <Image
                  src={`/images/course-img${kursId}.png`} // Örnek kurs resmi
                  alt={`Kurs ${kursId}`}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-4 flex-grow">
                <h3 className="text-lg font-bold">{`Kurs ${kursId}`}</h3>
                <p className="text-sm">Eğitmen: Eğitmen {kursId}</p>
                <div className="flex space-x-2 mt-auto">
                  <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40">
                    Başla/Devam Et
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 w-40"
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
