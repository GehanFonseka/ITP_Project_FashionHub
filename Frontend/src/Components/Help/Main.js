import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate(); 

  const styles = {
    container: {
      marginTop: '90px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f3f3f3',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    title: {
      fontSize: '30px',
      margin: '0',
    },
    subtitle: {
      fontSize: '15px',
      margin: '0',
      letterSpacing: '2px',
    },
    background: {
      backgroundColor: '#d3d3d3',
      padding: '20px',
      borderRadius: '10px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      width: '100%',
      maxWidth: '900px',
    },
    card: {
      backgroundColor: '#1b1b1b',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      borderRadius: '5px',
      textAlign: 'center',
      height: '200px',
      width: '200px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    cardText: {
      margin: '0',
      fontSize: '16px',
    },
    cardHover: {
      transform: 'translateY(-5px)',
    },
    cardActive: {
      transform: 'translateY(0)',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>FashionHub</h1>
        <p style={styles.subtitle}>SUPPORT</p>
      </header>
      <div style={styles.background}>
        <div style={styles.grid}>
          <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            onClick={() => navigate('/TicketForm')} 
          >
            <p style={styles.cardText}>Submit a Request</p>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            onClick={() => navigate('/faqs')}
          >
            <p style={styles.cardText}>FAQs</p>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            onClick={() => navigate('/chat')}
            
          >
            <p style={styles.cardText}>Support Bot</p>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            onClick={() => navigate('/refund')} 
          >
            <p style={styles.cardText}>Refund Policy</p>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            onClick={() => navigate('/shipping')}
          >
            <p style={styles.cardText}>Shipping Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
