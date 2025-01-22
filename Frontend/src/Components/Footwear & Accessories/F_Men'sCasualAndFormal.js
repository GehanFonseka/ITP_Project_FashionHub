import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import F3 from '../../assets/F3.webp'; 
import F4 from '../../assets/F4.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding-top: 75px;
  flex-wrap: wrap;
  gap: 10px; /* Space between sections on smaller screens */
  transition: all 0.3s ease-in-out; /* Smooth transition for resizing */
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 60px;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover transition */

  &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Soft shadow for hover effect */
  }

  &:first-child {
    background-image: url(${F3});
  }
  
  &:last-child {
    background-image: url(${F4});
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
    height: 300px;
    flex: 0 0 100%;
    background-size: cover;
    background-position: center;
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
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  letter-spacing: 2px; /* Add some letter spacing for a more modern look */

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 15px 0;
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
  transition: background 0.3s ease;
`;

const F_MensCasualAndFormal = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Section onClick={() => navigate('/F_MensFormal')}>
        <Overlay />
        <BlackLabel>Men's Formal</BlackLabel>
      </Section>
      <Section onClick={() => navigate('/F_MensCasual')}>
        <Overlay />
        <BlackLabel>Men's Casual</BlackLabel>
      </Section>
    </Container>
  );
};

export default F_MensCasualAndFormal;
