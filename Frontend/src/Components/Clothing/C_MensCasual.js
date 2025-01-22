import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import C9 from '../../assets/C9.webp';
import C10 from '../../assets/C10.webp';
import C11 from '../../assets/C11.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto; /* Adjusted for content height */
  margin: 0;
  padding: 50px 20px; /* Added padding for smaller screens */
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
    font-size: 1.5rem;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-top: 30px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  justify-content: center; /* Center-align items */
  gap: 20px; /* Space between items */
  width: 100%; /* Full width for responsiveness */
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 15px; /* Reduce spacing for smaller screens */
  }
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 300px; /* Default size for larger screens */
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

  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    font-size: 1rem;
  }
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
  font-size: 1.5rem;
  bottom: 0;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 8px 0;
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

const C_MensCasual = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigation handlers
  const handlePantsClick = () => {
    navigate('/C_MensCasualPants'); // Navigate to the Pants page
  };

  const handleTShirtsClick = () => {
    navigate('/OutOfStockPage'); // Navigate to the T-Shirts page
  };

  const handleShirtsClick = () => {
    navigate('/OutOfStockPage'); // Navigate to the Shirts page
  };

  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox 
          style={{ backgroundImage: `url(${C9})` }} 
          onClick={handlePantsClick} // Add onClick to navigate
        >
          <BlackLabel>Pants</BlackLabel>
        </ImageBox>
        <ImageBox 
          style={{ backgroundImage: `url(${C10})` }} 
          
        ><UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>T-Shirts</BlackLabel>
        </ImageBox>
        <ImageBox 
          style={{ backgroundImage: `url(${C11})` }} 
         
        ><UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Shirts</BlackLabel>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default C_MensCasual;
