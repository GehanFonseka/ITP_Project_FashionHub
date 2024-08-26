import React from 'react';

const MessagingInterface = () => {
  const styles = {
    container: {
      marginTop:'100px',
      marginBottom: '40px',
      width: '300px',
      height: '500px',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'inter',
      fontSize:'13px',
    },
    header: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '1px',
      textAlign: 'center',
    },
    messagesContainer: {
      flex: 1,
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflowY: 'scroll',
      backgroundColor: '#f9f9f9',
    },
    message: {
      maxWidth: '80%',
      padding: '10px',
      borderRadius: '10px',
      display: 'inline-block',
      position: 'relative',
      fontSize: '14px',
    },
    sent: {
      color:'white',
      backgroundColor: 'black',
      alignSelf: 'flex-end',
      borderRadius: '10px 10px 0 10px',
    },
    received: {
      backgroundColor: '#e5e5e5',
      alignSelf: 'flex-start',
      borderRadius: '10px 10px 10px 0',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    },
    time: {
      fontSize: '10px',
      color: '#999',
      marginTop: '5px',
      textAlign: 'right',
    },
    footer: {
      padding: '10px',
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
      borderTop: '1px solid #ddd',
      backgroundColor: '#fff',
    },
    input: {
      flexGrow: 1,
      padding: '8px',
      borderRadius: '20px',
      border: '1px solid #ddd',
    },
    sendButton: {
      padding: '8px 12px',
      border: 'none',
      backgroundColor: '#333',
      color: '#fff',
      borderRadius: '20px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Fashion Hub</h2>
      </div>
      <div style={styles.messagesContainer}>
        <div style={{ ...styles.message, ...styles.sent }}>
          <p>What are your shipping details?</p>
          <div style={styles.time}>2:49 PM</div>
        </div>
        <div style={{ ...styles.message, ...styles.received }}>
          <p>For domestic shipping:</p>
          <p>Shipping within Sri Lanka</p>
          <p>Shipping Method: CityPak</p>
          <p>Shipping Time: 2-3 Business days</p>
          <p>Shipping Cost: LKR 399/=</p>
          <div style={styles.time}>2:50 PM</div>
        </div>
      </div>
      <div style={styles.footer}>
        <input type="text" placeholder="Write a message..." style={styles.input} />
        <button style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default MessagingInterface;
