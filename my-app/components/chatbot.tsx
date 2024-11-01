import { useState } from "react";
import Image from "next/image";

const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const predefinedQuestions = [
    "Ders notlarını nasıl yükleyebilirim?",
    "Yapay zeka nasıl çalışıyor?"
  ];

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e.type === "click" || e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) {
        // Kullanıcı mesajını kaydet
        setMessages([...messages, `Kullanıcı: ${input}`]);

        // Yapay zeka cevabı oluştur
        const aiResponse = generateAIResponse(input);
        setMessages((prevMessages) => [...prevMessages, `Chatbot: ${aiResponse}`]);
        setInput("");
      }
    }
  };

  const generateAIResponse = (userInput: string) => {
    // Kısa ve öz cevaplar üreten basit bir fonksiyon
    const responses: { [key: string]: string } = {
      "Ders notlarını nasıl yükleyebilirim?": "Ders notlarını yüklemek için 'Yeni Not Ekle' sayfasına gidin.",
      "Yapay zeka nasıl çalışıyor?": "Yapay zeka, verileri işleyerek öğrenme yapar ve yanıtlar üretir."
    };
    return responses[userInput] || "Bu konuda daha fazla bilgiye ihtiyacım var.";
  };

  return (
    <>
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

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-80">
          <h2 className="font-bold mb-2">Sohbet Botu</h2>
          
          {/* Yapay Zeka tarafından oluşturulan sorular */}
          <div className="mb-2">
            {predefinedQuestions.map((question, index) => (
              <button 
                key={index} 
                className="block w-full bg-gray-200 hover:bg-gray-300 text-left p-2 rounded mb-2"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Mesaj kutusu */}
          <div className="flex flex-col">
            <div className="flex-1 overflow-y-auto mb-2 max-h-40">
              {messages.map((message, index) => (
                <div key={index} className="mb-1">
                  <span>{message}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleSendMessage}
              placeholder="Mesajınızı yazın..."
              className="border border-gray-300 rounded-lg p-2 w-full mb-1"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full font-bold"
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
