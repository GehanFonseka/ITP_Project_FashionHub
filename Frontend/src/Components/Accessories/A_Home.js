import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import A1 from '../../assets/A1.webp';
import A2 from '../../assets/A2.jpg';
import ReviewDisplay from '../Review/ReviewDisplay';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  position: relative;
  padding-top: 75px;
  
  @media (max-width: 768px) {
    padding-top: 40px; /* Reduced padding on mobile */
  }
`;

// Styles for each side (left and right)
const Side = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  
  &:first-child {
    background-image: url(${A2});
  }
  
  &:last-child {
    background-image: url(${A1});
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 300px; /* Reduced height for mobile */
    &::after {
      display: none; /* No separator line on mobile */
    }
  }
`;

// Black label with partial transparency
const Label = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller label font on mobile */
  }
`;

// Wrapper for the image section
const ImageSection = styled.div`
  display: flex;
  flex: 1;
  min-height: 80vh;
  position: relative;
  flex-wrap: wrap; /* Allow images to stack on smaller screens */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Stack images vertically on mobile */
    min-height: 60vh;
  }
`;

const ReviewSection = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  
  @media (max-width: 768px) {
    padding: 20px; /* Reduced padding on mobile */
  }
`;

const ReviewHeading = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem; /* Smaller heading on mobile */
  }
`;

const ReviewDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller description on mobile */
  }
`;

const ReviewButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ae2012;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust button font size on mobile */
    padding: 10px 15px; /* Adjust button padding on mobile */
  }
`;

const A_Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  let storeId = 'S004'

  return (
    <Container>
      <ImageSection>
        <Side onClick={() => handleNavigation('/A_Mens')}>
          <Label>Mens Accessories</Label>
        </Side>
        <Side onClick={() => handleNavigation('/A_Womens')}>
          <Label>Womens Accessories</Label>
        </Side>
      </ImageSection>

      <ReviewSection>
        <ReviewHeading>Customer Reviews: Where Style Meets Satisfaction</ReviewHeading>
        <ReviewDescription>
          Our passion is fashion, but our pride is in your satisfaction. Your review is a reflection of our commitment to excellence.
        </ReviewDescription>
        <ReviewButton href={`/ReviewForm/${storeId}`}>Write a Review</ReviewButton>
      </ReviewSection>

      {/* Display the ReviewDisplay component */}
      <ReviewDisplay storeID={storeId} />
    </Container>
  );
};

export default A_Home;
