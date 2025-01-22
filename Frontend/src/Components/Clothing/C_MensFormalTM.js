import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import C12 from '../../assets/C12.webp';
import C13 from '../../assets/C13.webp';
import C14 from '../../assets/C14.webp';

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
    height: auto;
    padding: 20px;
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

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-top: 50px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// Styled image box for categories with hover effect
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
  cursor: pointer;
  margin: 10px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
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

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
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

const C_MensFormalTM = () => {
  const navigate = useNavigate();

  // Functions to handle navigation
  const handleBlazersClick = () => {
    navigate('/C_TMMensBlazer');
  };

  const handleTrousersClick = () => {
    navigate('/OutOfStockPage'); // Example route for trousers
  };

  const handleShirtsClick = () => {
    navigate('/OutOfStockPage'); // Example route for shirts
  };

  return (
    <Container>
      <Quote>
        Experience Personalized Perfection – Tailor-Made to Fit Your Unique Style
      </Quote>
      <Row>
        <ImageBox
          style={{ backgroundImage: `url(${C12})` }}
          onClick={handleBlazersClick}
        >
          <BlackLabel>Blazers</BlackLabel>
        </ImageBox>
        <ImageBox
          style={{ backgroundImage: `url(${C13})` }}
          
        ><UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Trousers</BlackLabel>
        </ImageBox>
        <ImageBox
          style={{ backgroundImage: `url(${C14})` }}
          
        ><UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Shirts</BlackLabel>
        </ImageBox>
      </Row>
      {/* Add more rows dynamically if needed */}
    </Container>
  );
};

export default C_MensFormalTM;
