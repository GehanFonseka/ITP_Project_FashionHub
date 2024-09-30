import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import C1 from '../../assets/C1.jpg'; 
import C2 from '../../assets/C2.webp';
import ReviewDisplay from '../Review/ReviewDisplay';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes full viewport height */
  margin: 0;
  padding-top: 75px;
`;

// Wrapper for the image section
const ImageSection = styled.div`
  display: flex;
  flex: 1;
  min-height: 150vh; /* Ensures the image section takes half of the viewport height */
  position: relative;
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
    background-image: url(${C2});
  }

  &:last-child {
    background-image: url(${C1});
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
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

const Footer = styled.footer`
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
`;

const C_Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  let storeId = 'S001';

  



  return (
    <Container>
      {/* Image section */}
      <ImageSection>
        <Side onClick={() => handleNavigation('/C_WomensCasualAndFormal')}>
          <Label>Women's Clothing</Label>
        </Side>
        <Side onClick={() => handleNavigation('/C_MensCasualAndFormal')}>
          <Label>Men's Clothing</Label>
        </Side>
      </ImageSection>

      {/* Review section below images */}
      <ReviewSection>
        <ReviewHeading>Customer Reviews: Where Style Meets Satisfaction</ReviewHeading>
        <ReviewDescription>
          Our passion is fashion, but our pride is in your satisfaction. Your review is a reflection of our commitment to excellence.
        </ReviewDescription>
        <ReviewButton href={`/ReviewForm/${storeId}`}>Write a Review</ReviewButton>
      </ReviewSection>

      {/* Display the ReviewDisplay component */}
      <ReviewDisplay storeID={storeId} />

      {/* Footer */}
      <Footer>
        <p>© 2024 FashionHub. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default C_Home;

