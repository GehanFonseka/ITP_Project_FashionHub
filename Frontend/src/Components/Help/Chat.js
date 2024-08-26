import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


    
    
    const Chat = () => {

        const navigate = useNavigate();
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleChatbot = () => {
          setIsOpen(!isOpen);
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
                  <button style={styles.closeBtn} onClick={toggleChatbot}>✖</button>
                </div>
                <div style={styles.chatBody}>
                  <p>👋 Hello! Please message us if you have questions</p>
                  <input type="text" placeholder="Write message" style={styles.chatInput} />
                  <div style={styles.instantAnswers}>
                    <button style={styles.instantAnswerBtn} onClick={() => navigate('/Chat1')}>What are your shipping details?</button>
                    <button style={styles.instantAnswerBtn}>What is your contact info?</button>
                    <button style={styles.instantAnswerBtn}>What offers do you currently have?</button>
                    <button style={styles.instantAnswerBtn}>What is your return policy?</button>
                  </div>
                </div>
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
        },
        chatInput: {
          width: '92%',
          padding: '10px',
          marginTop: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        },
        instantAnswers: {
          marginTop: '15px',
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

        chatIconContent: {
          fontSize: '30px',
        },
        instantAnswerBtnHover: {
          backgroundColor: '#e0e0e0',
        },
      };


export default Chat;