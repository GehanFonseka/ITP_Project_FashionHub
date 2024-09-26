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
  cursor: pointer; /* Show pointer cursor on hover */
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

const C_MensCasual = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to the Pants page
  const handlePantsClick = () => {
    navigate('/C_MensCasualPants'); // Navigate to the C_MensCasualPants page
  };

  // Function to handle navigation to the T-Shirts page
  const handleTShirtsClick = () => {
    navigate('/C_MensCasualTShirts'); // Replace with actual path if needed
  };

  // Function to handle navigation to the Shirts page
  const handleShirtsClick = () => {
    navigate('/C_MensCasualShirts'); // Replace with actual path if needed
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
          onClick={handleTShirtsClick} // Add onClick to navigate
        >
          <BlackLabel>T-Shirts</BlackLabel>
        </ImageBox>
        <ImageBox 
          style={{ backgroundImage: `url(${C11})` }} 
          onClick={handleShirtsClick} // Add onClick to navigate
        >
          <BlackLabel>Shirts</BlackLabel>
        </ImageBox>
      </Row>
      {/* Add more rows as needed */}
    </Container>
  );
};

export default C_MensCasual;
