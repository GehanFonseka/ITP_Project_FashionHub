import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import F6 from '../../assets/F6.jpg';
import s3 from '../../assets/s3.webp'; 

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding-top: 75px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack sections vertically on smaller screens */
  }
`;

// Styles for each section (left and right)
const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:first-child {
    background-image: url(${F6});
  }

  &:last-child {
    background-image: url(${s3});
  }

  // Hover effects
  &:hover {
    transform: scale(1.05); /* Slight zoom on hover */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    height: 50vh; /* Adjust the height for mobile screens */
  }
`;

// Black label with partial transparency
const BlackLabel = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 1.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.4rem; /* Adjust font size for mobile */
  }
`;

// Overlay to improve text visibility
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const F_WomensCasualAndFormal = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Section onClick={() => navigate('/F_WomensCasual')}>
        <Overlay />
        <BlackLabel>Women's Casual</BlackLabel>
      </Section>
      <Section onClick={() => navigate('/F_WomensFormal')}>
        <Overlay />
        <BlackLabel>Women's Formal</BlackLabel>
      </Section>
    </Container>
  );
};

export default F_WomensCasualAndFormal;
