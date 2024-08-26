import React from 'react';

const Shipping = () => {
  const styles = {
    container: {
      display: 'flex',
      marginBottom: '1px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height for vertical centering
      fontFamily: 'Arial, sans-serif',
      padding: '1px', // Adjust padding to prevent overflow
      textAlign: 'center', // Center text within the container
    },
    topic: {
      color: 'black',
      fontSize: '24px',
      margin: '0 0 20px 0',
    },
    description: {
      color: '#3B444B', // Light black color
      fontSize: '16px',
      lineHeight: '1.5',
      whiteSpace: 'pre-line', // To handle line breaks in the text
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.topic}>Shipping Policy</h1>
      <p style={styles.description}>
        FashionHub is not responsible for Duties & Taxes if charged upon receipt of delivery for orders placed outside of Sri Lanka.
        {'\n\n'}Same day delivery orders must be placed before 11am local time. Orders placed after 11am will be only shipped out the next day.
        {'\n'}Same day delivery is only available for Colombo 1-15 and suburbs.
        {'\n'}(Up to Mount Lavinia - Dematagoda - Battaramulla - Homagama)
      </p>
    </div>
  );
};

export default Shipping;
