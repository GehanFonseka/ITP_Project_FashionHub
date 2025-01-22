import React from 'react';
import styled from 'styled-components';
import cort from '../../assets/cort.jpeg';
import loafers from '../../assets/loafers.jpg';
import heel from '../../assets/heel.webp';

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
    padding-top: 30px; /* Less padding on mobile */
    margin-bottom: 180px; /* Add margin at the bottom to prevent footer overlap */
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
    font-size: 1.4rem; /* Smaller font on mobile */
    margin-top: 50px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allow the items to wrap on smaller screens */
  width: 80%;
  margin-bottom: 30px;
  gap: 20px; /* Spacing between items */
  @media (max-width: 768px) {
    width: 90%;
    gap: 10px; /* Smaller gap on mobile */
  }
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 30%;  /* Default size for large screens */
  height: 300px; /* Fixed height */
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
  cursor: pointer; /* Add pointer cursor */
  @media (max-width: 768px) {
    width: 45%; /* Smaller width on mobile */
    height: 250px; /* Adjusted height for smaller screens */
    font-size: 1.3rem; /* Smaller text */
  }
  @media (max-width: 480px) {
    width: 100%; /* Full width on very small screens */
    height: 200px;
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
    font-size: 1.2rem; /* Adjust label font size */
  }
`;

// Unavailable text on top of the image
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

const F_WomensFormal = () => {
  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${cort})` }}>
          <BlackLabel>Court Shoes</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${loafers})` }}>
          <BlackLabel>Loafers</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${heel})` }}>
          <BlackLabel>Heels</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default F_WomensFormal;
