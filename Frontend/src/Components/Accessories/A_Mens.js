import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styled from 'styled-components';
import b1 from '../../assets/b1.webp';
import b2 from '../../assets/b2.webp';
import w1 from '../../assets/w1.webp';

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
`;

const A_Mens = () => {
  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <Link to="/A_MensCandB" style={{ textDecoration: 'none' }}>
          <ImageBox style={{ backgroundImage: `url(${b1})` }}>
            <BlackLabel>Chains & Bracelets</BlackLabel>
          </ImageBox>
        </Link>
        <ImageBox style={{ backgroundImage: `url(${b2})` }}>
          <BlackLabel>Belts</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${w1})` }}>
          <BlackLabel>Watches</BlackLabel>
        </ImageBox>
      </Row>
      {/* Add more rows as needed */}
    </Container>
  );
};

export default A_Mens;
