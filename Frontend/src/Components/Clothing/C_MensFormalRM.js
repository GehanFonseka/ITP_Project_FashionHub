import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import C12 from '../../assets/C12.webp'; // Updated image path
import C13 from '../../assets/C13.webp'; // Updated image path
import C14 from '../../assets/C14.webp'; // Updated image path

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto; /* Adjusted for responsive height */
  margin: 0;
  padding: 50px 20px; /* Added padding for small screens */
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
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  justify-content: center;
  gap: 20px; /* Space between items */
  width: 100%; /* Full width for responsiveness */
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

// Styled image box for categories with a black label
const ImageBox = styled.div`
  width: 300px;  /* Default size for larger screens */
  height: 300px; /* Default size for larger screens */
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

const C_MensFormalRM = () => {
  return (
    <Container>
      <Quote>Experience Personalized Perfection – Tailor-Made to Fit Your Unique Style</Quote>
      <Row>
        <Link to="/C_RMMensBlazer" style={{ textDecoration: 'none' }}>
          <ImageBox style={{ backgroundImage: `url(${C12})` }}>
            <BlackLabel>Blazers</BlackLabel>
          </ImageBox>
        </Link>
        <Link to="/OutOfStockPage" style={{ textDecoration: 'none' }}>
          <ImageBox style={{ backgroundImage: `url(${C13})` }}>
            <BlackLabel>Trousers</BlackLabel>
            <UnavailableText>Currently Unavailable</UnavailableText>
          </ImageBox>
        </Link>
        <Link to="/OutOfStockPage" style={{ textDecoration: 'none' }}>
          <ImageBox style={{ backgroundImage: `url(${C14})` }}>
          <UnavailableText>Currently Unavailable</UnavailableText>
            <BlackLabel>Shirts</BlackLabel>
          </ImageBox>
        </Link>
      </Row>
    </Container>
  );
};

export default C_MensFormalRM;
