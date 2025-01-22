import React from 'react';
import styled from 'styled-components';
import l1 from '../../assets/l1.png';
import l2 from '../../assets/l2.webp';
import l3 from '../../assets/l3.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0;
  padding-top: 50px;
`;

// Quote section
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 300px;  /* Increased size */
  height: 300px; /* Increased size */
  background-size: cover;
  background-position: center;
  position: relative; /* Needed for overlay */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem; /* Adjusted font size */
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
`;

// Black label with partial transparency
const BlackLabel = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7); /* Black with 70% opacity */
  color: white;
  text-align: center;
  padding: 10px 0;
  text-transform: uppercase;
  font-size: 1.5rem; /* Adjusted font size */
  bottom: 0;
  z-index: 2; /* Ensure label is above the overlay */
`;
const UnavailableText = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  z-index: 3;
  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font for mobile */
  }
`;

const A_Womens = () => {
  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${l1})` }}>
          <BlackLabel>chains & bracelets</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${l2})` }}>
          <BlackLabel>Belts</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${l3})` }}>
          <BlackLabel>Watchs</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
      </Row>
      {/* Add more rows as needed */}
    </Container>
  );
};

export default A_Womens;