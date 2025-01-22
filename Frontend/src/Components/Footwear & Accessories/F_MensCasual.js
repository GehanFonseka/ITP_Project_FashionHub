import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ms1 from '../../assets/ms1.jpg';
import slid from '../../assets/slid.jpg';
import con1 from '../../assets/con1.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0;
  padding-top: 50px;
  background-color: #f8f8f8;
`;

// Quote section
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;
  max-width: 800px; /* Ensures it doesn’t stretch too wide */
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.4rem; /* Smaller font for mobile */
    margin-top: 50px;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  width: 80%;
  margin-bottom: 30px;
  gap: 15px; /* Space between items */

  @media (max-width: 768px) {
    width: 95%;
  }
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
  cursor: pointer; /* Indicate clickable */
  transition: transform 0.3s ease-in-out; /* Smooth scale effect */
  
  &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 250px; /* Adjust height on mobile */
    font-size: 1.2rem; /* Adjust font size */
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
  font-size: 1.5rem; /* Adjusted font size */
  bottom: 0;
  z-index: 2; /* Ensure label is above the overlay */

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Adjust font size for mobile */
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

const F_MensCasual = () => {
  const navigate = useNavigate();

  const handleSneakerClick = () => {
    navigate('/F_MensCasualSneakers'); // Navigate to the correct path
  };

  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${ms1})` }} onClick={handleSneakerClick}>
          <BlackLabel>Sneakers</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${slid})` }}>
          <BlackLabel>Slides</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${con1})` }}>
          <BlackLabel>Canvas Shoes</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default F_MensCasual;
