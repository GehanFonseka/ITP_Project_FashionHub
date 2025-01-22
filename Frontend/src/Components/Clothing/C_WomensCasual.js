import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import C18 from '../../assets/C18.jpg'; 
import C19 from '../../assets/C19.webp'; 
import C20 from '../../assets/C20.jpg'; 

// Reuse existing styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0;
  padding-top: 50px;
`;

const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-bottom: 30px;
`;

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
  cursor: pointer; /* Make it clickable */
`;

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

const C_WomensCasual = () => {
  const navigate = useNavigate(); // Use navigate hook for redirection

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${C18})` }} >
        <UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Pants</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${C19})` }} onClick={() => handleNavigation('/C_WomensCasualTshirt')}>
          <BlackLabel>T-Shirts</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${C20})` }}>
        <UnavailableText>Currently Unavailable</UnavailableText>
          <BlackLabel>Shirts</BlackLabel>
        </ImageBox>
      </Row>
      {/* Add more rows as needed */}
    </Container>
  );
};

export default C_WomensCasual;
