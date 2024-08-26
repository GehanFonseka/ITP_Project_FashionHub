import React from 'react';

const Faqs = () => {
  const styles = {
    container: {
      marginTop: '100px',
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
    },
    topic: {
      position: 'absolute',
      top: '130px',
      left: '50px',
      fontSize: '24px',
      margin: '0',
    },
    item: {
      marginTop: '40px',
    },
    question: {
      color: 'black',
      fontSize: '18px',
      margin: '0',
      fontWeight: 'bold',
    },
    answer: {
      color: '#3B444B',
      fontSize: '16px',
      marginTop: '5px',
      whiteSpace: 'pre-line',  // To handle line breaks in the text
    },
    link: {
      color: 'blue',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.topic}>FAQs</h1>

      <div style={styles.item}>
        <h2 style={styles.question}>1. What payment methods are accepted?</h2>
        <p style={styles.answer}>Direct bank transfer, Visa and MasterCards.</p>
      </div>

      <div style={styles.item}>
        <h2 style={styles.question}>2. How long would my delivery take?</h2>
        <p style={styles.answer}>
          This depends on your address.
          {'\n\n'}For orders placed before 10am on Weekdays:
          {'\n'}- Colombo and suburbs: Within 48 hours
          {'\n'}- Western province: 48 hours
          {'\n'}- Out station: Between 1-5 working days
          {'\n\n'}Orders placed over the weekend get dispatched on Monday.
          {'\n\n'}*Timings could be subjected to change during a launch due to the large volume of orders.
          {'\n'}Our team has one goal: to get your order delivered to your doorstep as soon as possible.
        </p>
      </div>

      <div style={styles.item}>
        <h2 style={styles.question}>3. Returns/Refunds/ Exchanges?</h2>
        <p style={styles.answer}>
          Please click the below article for all details on Returns and exchanges:
          {'\n'}
          <a href="https://FashionHub.com/policies/refund-policy" style={styles.link}>
            https://FashionHub.com/policies/refund-policy
          </a>
        </p>
      </div>

      <div style={styles.item}>
        <h2 style={styles.question}>4. How to Contact the store?</h2>
        <p style={styles.answer}>
          We are always here to help you. Simply reach us on WhatsApp messaging or email us:
          {'\n\n'}WhatsApp message hotline: 0777 216789
          {'\n'}Email: support@FashionHub.com
        </p>
      </div>
    </div>
  );
};

export default Faqs;
