import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";


const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [currentStage, setCurrentStage] = useState("initial");
  const [selectedStore, setSelectedStore] = useState(""); // Track selected store
  const [view, setView] = useState("main"); // Track which view (main or instant answers)
  const chatWindowRef = useRef(null);

  // Updated suggestions for various stages
  const suggestions = {
    initial: [
      "Check store hours",
      "View promotions",
      "Book a parking spot",
      "Report an issue",
    ],
    promotions: ["SHID01", "SHID02", "SHID03", "SHID04"],
    storeHours: ["SHID01", "SHID02", "SHID03", "SHID04"],
    parkingSpot: ["Ground Floor", "Basement Parking", "Valet Parking"],
  };

  const responses = {
    "Check store hours":
      "Please select the store for which you want to know the hours.",
    "View promotions": "Which store's promotions are you interested in?",
    "Book a parking spot": "Please choose a parking location.",
    "Report an issue":
      "Please contact customer care or raise a ticket for assistance.",

    // Store Hours Responses
    "SHID01 hours": "Store SHID01 is open from 9 AM to 9 PM.",
    "SHID02 hours": "Store SHID02 is open from 10 AM to 8 PM.",
    "SHID03 hours": "Store SHID03 is open from 11 AM to 7 PM.",
    "SHID04 hours": "Store SHID04 is open from 9 AM to 6 PM.",

    // Promotions Responses
    "SHID01 promotions":
      "Store SHID01 offers discounts on electronics and Buy 1 Get 1 Free on selected items.",
    "SHID02 promotions":
      "Store SHID02 is offering 50% off on clothing for this week only.",
    "SHID03 promotions":
      "Store SHID03 has special deals on kitchenware products.",
    "SHID04 promotions":
      "Store SHID04 offers discounts on furniture, with up to 30% off.",

    // Parking Spot Responses
    "Ground Floor":
      "You have successfully booked a parking spot on the Ground Floor.",
    "Basement Parking":
      "You have successfully booked a parking spot in the Basement Parking.",
    "Valet Parking":
      "Valet Parking has been booked for you. Please present your booking code at the entrance.",
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      setMessages([...messages, { text: message, user: true }]);
      setInput("");
      setIsBotTyping(true);

      // Simulate a response from the bot
      setTimeout(() => {
        let response = "";

        // Handle promotions and store hours after selecting a store
        if (
          currentStage === "promotions" &&
          suggestions.promotions.includes(message)
        ) {
          setSelectedStore(message);
          response = `${message} promotions: ${
            responses[`${message} promotions`]
          }`;
        } else if (
          currentStage === "storeHours" &&
          suggestions.storeHours.includes(message)
        ) {
          response = `${message} hours: ${responses[`${message} hours`]}`;
        } else if (responses[message]) {
          response = responses[message];
        } else {
          response = "I'm here to help! What can I assist you with today?";
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response, user: false },
        ]);
        setIsBotTyping(false);

        // Update current stage based on the message
        if (message === "View promotions") {
          setCurrentStage("promotions");
        } else if (message === "Check store hours") {
          setCurrentStage("storeHours");
        } else if (message === "Book a parking spot") {
          setCurrentStage("parkingSpot");
        }
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
    setView("instantAnswers"); // Switch to the instant answers view
  };

  const returnToMainChat = () => {
    setView("main"); // Return to the main chat view
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-32 right-6 bg-white shadow-xl p-4 rounded-lg w-80 h-[450px] z-50">
      <div className="relative h-full flex flex-col">
        <div className="p-4 bg-gray-800 text-white rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Chat with us</h2>
          <button onClick={onClose} className="text-white">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {view === "main" ? (
          <>
            <div className="px-4 py-2">
              <p className="text-sm">
                👋 Hi, message us with any questions. We're happy to help!
              </p>
              <button
                className="w-full bg-gray-400 text-white py-2 mt-2 rounded"
                onClick={returnToMainChat}
              >
                Return to chat
              </button>
            </div>

            <div className="p-4 flex flex-col">
              <p className="font-semibold">Instant answers</p>
              {[...suggestions.initial].map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="block w-full py-2 px-4 mb-2 text-left border rounded-md hover:bg-gray-200 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            {/* Instant answers chat view */}
            <div
              ref={chatWindowRef}
              className="p-3 flex-grow h-60 overflow-y-auto"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.user
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isBotTyping && (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
                  <span className="ml-2 text-dark animate-pulse">
                    Typing...
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <button
                className="w-full bg-gray-400 text-white py-2 mt-2 rounded"
                onClick={returnToMainChat}
              >
                Return to chat
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col p-1 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-primary text-white py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
