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
  margin: 0; /* Ensure there's no margin affecting the layout */
  position: relative; /* Needed for the separator */
  padding-top:75px;
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
  cursor: pointer; /* Shows a pointer cursor on hover */
  
  // Use background-image property to set different images for each side
  &:first-child {
    background-image: url(${A2});
  }
  
  &:last-child {
    background-image: url(${A1});
  }
  
  /* Add a separator line between sections */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px; /* Width of the separator line */
    height: 100%;
    background: rgba(0, 0, 0, 0.7); /* Color of the separator line */
    z-index: 1; /* Ensure separator is above the background */
  }
`;

// Black label with partial transparency
const Label = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7); /* Black with 70% opacity */
  color: white;
  text-align: center;
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2; /* Ensure label is above the separator */
`;

// Wrapper for the image section
const ImageSection = styled.div`
  display: flex;
  flex: 1;
  min-height: 80vh; /* Ensures the image section takes half of the viewport height */
  position: relative;
`;

const ReviewSection = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
`;

const ReviewHeading = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const ReviewDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
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
        <Label> Mens accessories</Label>
      </Side>
      <Side onClick={() => handleNavigation('/A_Womens')}>
        <Label>Womes accessories</Label>
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