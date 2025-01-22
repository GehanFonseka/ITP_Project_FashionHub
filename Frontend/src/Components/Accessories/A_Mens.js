import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import b1 from '../../assets/b1.webp';
import b2 from '../../assets/b2.webp';
import w1 from '../../assets/w1.webp';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0;
  padding-top: 50px;
  
  @media (max-width: 768px) {
    padding-top: 30px; /* Reduced padding for mobile */
    margin-bottom: 350px; /* Add margin at the bottom for mobile */
  }
`;

// Quote section
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Adjusted font size for mobile */
    margin-top: 50px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
  flex-wrap: wrap; /* Allow images to wrap on smaller screens */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Stack images vertically on mobile */
    width: 100%;
  }
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    height: 250px; /* Reduced height for mobile */
    margin-bottom: 20px; /* Add margin between stacked items */
  }
`;

// Black label with partial transparency
const BlackLabel = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 10px 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  bottom: 0;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Adjust label font size for mobile */
  }
`;

// Unavailable text style
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
    font-size: 1rem; /* Smaller font size on mobile */
  }
`;

const A_Mens = () => {
  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <Link to="/A_MensCandB" style={{ textDecoration: 'none' }}>
          <ImageBox style={{ backgroundImage: `url(${b1})` }}>
            <BlackLabel>Chains & Bracelets</BlackLabel>
          </ImageBox>
        </Link>
        <ImageBox style={{ backgroundImage: `url(${b2})` }}>
          <BlackLabel>Belts</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${w1})` }}>
          <BlackLabel>Watches</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
      </Row>
      {/* Add more rows as needed */}
    </Container>
  );
};

export default A_Mens;
