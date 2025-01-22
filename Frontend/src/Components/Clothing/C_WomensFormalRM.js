import React from 'react';
import styled from 'styled-components';
import C23 from '../../assets/C23.jpg'; // Updated image path for Blazers
import C24 from '../../assets/C24.webp'; // Updated image path for Trousers
import C25 from '../../assets/C25.webp'; // Updated image path for Shirts

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
    padding-top: 40px;
    margin-bottom: 130px;
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
    font-size: 1.5rem; /* Smaller font size for mobile */
    margin-top: 40px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  gap: 20px; /* Space between image boxes */
  @media (max-width: 768px) {
    width: 90%;
  }
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 300px;  /* Default size */
  height: 300px; /* Default size */
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
    width: 100%;  /* Full width on mobile */
    height: 200px; /* Reduced height on mobile */
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
    font-size: 1.2rem; /* Smaller font on mobile */
  }
`;

// "Currently Unavailable" text overlay
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

const C_WomensFormalRM = () => {
  return (
    <Container>
      <Quote>Step Into Elegance – Ready-Made to Impress</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${C24})` }}>
          <UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Blazers</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${C23})` }}>
          <UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Trousers</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${C25})` }}>
          <UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Shirts</BlackLabel>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default C_WomensFormalRM;
