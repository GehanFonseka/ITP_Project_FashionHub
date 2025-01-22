import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import s2 from '../../assets/s2.webp';
import ol1 from '../../assets/ol1.jpg';
import ob from '../../assets/ob.webp';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0;
  padding-top: 50px;
  background-color: #f9f9f9;
`;

// Quote section
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 2rem;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

// Row container for categories
const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 80%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 15px;
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
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 100%;
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
`;

// Unavailable text overlay
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
    font-size: 1rem;
  }
`;

const F_MensFormal = () => {
  const navigate = useNavigate();

  const handleOfficeShoesClick = () => {
    navigate('/F_MensFormalOfficeshoes');
  };

  return (
    <Container>
      <Quote>Elevate Your Everyday Style – Discover the Perfect Blend of Comfort and Class</Quote>
      <Row>
        <ImageBox style={{ backgroundImage: `url(${s2})` }} onClick={handleOfficeShoesClick}>
          <BlackLabel>Office Shoes</BlackLabel>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${ol1})` }}>
          <BlackLabel>Loafers</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
        <ImageBox style={{ backgroundImage: `url(${ob})` }}>
          <BlackLabel>Boots</BlackLabel>
          <UnavailableText>Currently Unavailable</UnavailableText>
        </ImageBox>
      </Row>
    </Container>
  );
};

export default F_MensFormal;
