import React, { useState } from "react";
import ChatBot from "./ChatBot"; // Adjust the path as necessary
import { AiOutlineMessage } from "react-icons/ai";

const ChatBotButton = () => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  return (
    <>
      {/* Section 5: ChatBot Button */}
      {isChatBotVisible ? (
        <div className="fixed bottom-8 right-6 bg-white shadow-xl p-4 rounded-lg w-80 h-[550px] z-50">
          <ChatBot onClose={() => setIsChatBotVisible(false)} />
        </div>
      ) : (
        <button
          onClick={() => setIsChatBotVisible(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-105 flex items-center justify-center"
        >
          <AiOutlineMessage size={24} />
        </button>
      )}
    </>
  );
};

export default ChatBotButton;
