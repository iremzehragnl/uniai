import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // Yönlendirme için useRouter
import Link from "next/link";

export default function NotDefterim() {
  const router = useRouter(); // useRouter ile yönlendirme
  const [isChatOpen, setChatOpen] = useState(false);
  
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleNewNote = () => {
    router.push('/yeni-not-ekle'); // Yeni not sayfasına yönlendirme
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
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500">
            <Link href="/kurslarim">
              <div className="flex items-center">
                <Image src="/images/course-icon.png" alt="Kurslarım" width={20} height={20} className="mr-2" />
                Kurslarım
              </div>
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-green-500 text-green-500">
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
        <h1 className="text-2xl font-bold mb-6">Not Defterim</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kutucuk 1 */}
          <div className="border rounded-lg shadow-md flex w-full h-64">
            <div className="relative w-1/3 h-full">
              <Image
                src="/images/note-img.png" // Örnek resim
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
  className="mt-auto bg-white text-green-500 p-2 rounded-full border border-gray hover:bg-green-500 hover:text-white hover:shadow-lg transform hover:scale-105 transition duration-200"
>
  Not Ekle/Düzenle
</button>

            </div>
          </div>
          {/* Kutucuk 2 */}
          <div className="border rounded-lg shadow-md flex w-full h-64">
            <div className="relative w-1/3 h-full">
              <Image
                src="/images/note-img.png" // Örnek resim
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
  className="mt-auto bg-white text-green-500 p-2 rounded-full border border-gray hover:bg-green-500 hover:text-white hover:shadow-lg transform hover:scale-105 transition duration-200"
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
  className="flex flex-col items-center mt-4 bg-white text-black font-sb px-8 p-3 rounded-full border border-gray-300 hover:shadow-lg transform hover:scale-105 transition duration-200 h-13"
>
            <Image 
    src="/images/uniai-icon.png"
    alt="Yeni Not Ekle"
    width={20} // İkonun genişliği....
    height={20} // İkonun yüksekliği
    className="mr-2" // İkon ile metin arasında boşluk oluşturmak için
  />
            Yeni Not Ekle
          </button>
          </Link>
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
