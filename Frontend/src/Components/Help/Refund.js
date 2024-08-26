import React from 'react';

const Refund = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      lineHeight: 1.6,
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      marginTop: '100px',
    },
    heading1: {
      fontSize: '23px',
      color: '#1a1a1a',
      marginBottom: '20px',
    },
    heading2: {
      fontSize: '20px',
      color: '#333',
      marginTop: '20px',
    },
    mainHeading: {
      fontSize: '27px',
      color: '#000',
      marginBottom: '40px',
      paddingBottom: '10px',
      textAlign: 'center', 
    },
    paragraph: {
      fontSize: '16px',
      margin: '10px 0',
    },
    subtleBoldText: {
        fontWeight: '550', // Slightly bolder than normal
      },
    list: {
      listStyleType: 'disc',
      margin: '16px 0',
      paddingLeft: '20px',
    },
    listItem: {
      margin: '5px 0',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeading}>Refund Policy</h1>
      <h2 style={styles.heading1}>FASHIONHUB - RETURN AND EXCHANGE POLICY</h2>
      <p style={styles.paragraph}>
        We want you to love the products you receive from us as much as we love creating them. If you're not entirely satisfied, we're here to assist you throughout the return/exchange/refund process.
      </p>

      <h2 style={styles.heading2}>Return and Exchange Eligibility (Read this to see if you are eligible for a return)</h2>
      <p style={styles.paragraph}>
        We have a 21-day return window for all items on our site and in-stores (excluding items discounted 20% or more).
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Items must be unwashed.</li>
        <li style={styles.listItem}>Items must be unworn.</li>
        <li style={styles.listItem}>Items must be in original packaging.</li>
        <li style={styles.listItem}>Items with pilling may be subject to denial.</li>
        <li style={styles.listItem}>Items with markings or other stains will not be accepted.</li>
        <li style={styles.listItem}>Items with strong odors, such as smoke, cologne, detergent, etc., will not be accepted.</li>
        <li style={styles.listItem}>Accessories such as jewelry, caps, bottles, bags cannot be returned/exchanged due to hygiene purposes.</li>
        <li style={styles.listItem}>Bodysuits Cannot be exchanged due to Hygiene concerns.</li>
        <li style={styles.listItem}>Returns or exchanges on socks or other undergarment pieces cannot be accepted due to hygiene purposes.</li>
      </ul>

      <p style={styles.paragraph}>
      <span style={styles.subtleBoldText}>*Our 21-day warranty excludes normal wear and tear and damage caused by misuse or accidents.</span>
      </p>

      <p style={styles.paragraph}>
        If your product(s) meet our return conditions, our team will issue a store credit to the email attached to your order (excluding shipping costs).
      </p>
      <p style={styles.paragraph}>
        Store credit/ coupon codes/ gift cards are valid for one year from the date of issue.
      </p>
      <p style={styles.paragraph}>
        Please note that we reserve the right to deny returns after 21 days.
      </p>

      <h2 style={styles.heading2}>Item Missing from Your Order / Received a Damaged Item / Received an Incorrect Item</h2>
      <p style={styles.paragraph}>
        If you've received an incorrect item, missing an item from your order, or an item is damaged in any way, please submit a ticket to our support team at{' '}
        <a href="mailto:support@fashionhub.com" style={styles.link}>
          support@fashionhub.com
        </a>
        . (Please note this must be done within 48 hours of you receiving the order)
      </p>

      <h2 style={styles.heading2}>Out-of-Stock Exchanges</h2>
      <p style={styles.paragraph}>
        If the desired exchange product is out of stock, we will issue store credit valid for up to 12 months from the date of issue.
      </p>
    </div>
  );
};

export default Refund;
