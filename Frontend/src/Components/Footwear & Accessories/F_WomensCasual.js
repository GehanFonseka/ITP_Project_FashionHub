import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import sw from '../../assets/sw.jpg';
import slipper from '../../assets/slipper.jpg';
import wb from '../../assets/wb.webp';

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
    padding-top: 30px;
    margin-bottom: 350px;
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
    font-size: 1.5rem; /* Adjust font size for mobile */
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 90%;
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
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px; /* Smaller size on mobile */
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
    font-size: 1.2rem; /* Smaller font for mobile */
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

const F_WomensCasual = () => {
  const navigate = useNavigate();

  const handleBootsClick = () => {
    navigate('/F_WomensCasualBoots'); // Navigate to F_WomensCasualBoots component
  };

  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${sw})` }}>
          <BlackLabel>Sneakers</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${slipper})` }}>
          <BlackLabel>Slippers</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${wb})` }} onClick={handleBootsClick}>
          <BlackLabel>Boots</BlackLabel>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default F_WomensCasual;
