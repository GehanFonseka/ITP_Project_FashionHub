import React, { useState } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState('main');
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setView('main');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = {
        sender: 'user',
        text: inputValue.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...messages, userMessage]);
      setInputValue('');
      setView('details');
    }
  };

  const handleInstantAnswer = (question, answer) => {
    const userMessage = {
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botResponse = {
      sender: 'bot',
      text: answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage, botResponse]);
    setView('details');
  };

  const handleBack = () => {
    setView('main');
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatIcon} onClick={toggleChatbot}>
        <span style={styles.chatIconContent}>💬</span>
      </div>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Chat with us</span>
            {view === 'details' && (
              <button style={styles.backBtn} onClick={handleBack}>←</button>
            )}
            <button style={styles.closeBtn} onClick={toggleChatbot}>✖</button>
          </div>
          <div style={styles.chatBody}>
            {view === 'main' && (
              <>
                <p>👋 Hello! Please message us if you have questions</p>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Write a message"
                    style={styles.chatInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button style={styles.sendBtn} onClick={handleSend}>Send</button>
                </div>
                <div style={styles.instantAnswers}>
                  <button
                    style={styles.instantAnswerBtn}
                    onClick={() =>
                      handleInstantAnswer(
                        'What are your shipping details?',
                        `For domestic shipping: 
Shipping within Sri Lanka
Shipping Method: CityPak
Shipping Time: 2-3 Business days
Shipping Cost: LKR 399/=

For international shipping: 
Shipping Method: DHL
Shipping Time: 5-7 Business days
Shipping Cost: It depends on the items in your cart and the weight.`
                      )
                    }
                  >
                    What are your shipping details?
                  </button>
                  <button
                    style={styles.instantAnswerBtn}
                    onClick={() =>
                      handleInstantAnswer(
                        'What is your contact info?',
                        'You can reach us at +94 11 2345678 or email us at support@FashionHub.com.'
                      )
                    }
                  >
                    What is your contact info?
                  </button>
                  <button
                    style={styles.instantAnswerBtn}
                    onClick={() =>
                      handleInstantAnswer(
                        'What offers do you currently have?',
                        'We currently offer 10% off on all new arrivals and free shipping on orders over LKR 5000.'
                      )
                    }
                  >
                    What offers do you currently have?
                  </button>
                  <button
                    style={styles.instantAnswerBtn}
                    onClick={() =>
                      handleInstantAnswer(
                        'What is your return policy?',
                        'You can return items within 30 days of purchase. Please ensure the items are in their original condition.'
                      )
                    }
                  >
                    What is your return policy?
                  </button>
                </div>
              </>
            )}
            {view === 'details' && messages.map((msg, index) => (
              <div key={index} style={{ ...styles.chatMessage, ...styles[msg.sender] }}>
                <div>{msg.text}</div>
                <div style={styles.timestamp}>{msg.timestamp}</div>
              </div>
            ))}
          </div>
          {view === 'details' && (
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Write message"
                style={styles.chatInput}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button style={styles.sendBtn} onClick={handleSend}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#000',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
  },
  chatWindow: {
    width: '300px',
    height: '400px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '60px',
    right: '0',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: 'auto',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  chatBody: {
    padding: '15px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  chatMessage: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#000',
    color: '#fff',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: '10px',
    color: '#999',
    marginTop: '5px',
    textAlign: 'right',
  },
  chatInput: {
    width: '80%',
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  sendBtn: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'black',
    color: '#fff',
    cursor: 'pointer',
  },
  instantAnswers: {
    marginTop: '15px',
  },
  chatIconContent: {
    fontSize: '30px',
  },
  instantAnswerBtn: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
};

export default Chat;
