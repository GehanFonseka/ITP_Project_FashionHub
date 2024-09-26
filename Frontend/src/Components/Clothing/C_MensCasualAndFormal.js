import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import C3 from '../../assets/C3.jpg'; 
import C4 from '../../assets/C4.webp';

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0; /* Ensure there's no margin affecting the layout */
  padding-top: 75px;
`;

// Styles for each section (left and right)
const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover; /* Ensure the image covers the section */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent image repetition */
  overflow: hidden; /* Hide any overflow */
  cursor: pointer; /* Shows a pointer cursor on hover */
  
  // Use background-image property to set different images for each section
  &:first-child {
    background-image: url(${C3});
  }
  
  &:last-child {
    background-image: url(${C4});
  }

  // Add a separator line between sections
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
const BlackLabel = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7); /* Black with 70% opacity */
  color: white;
  text-align: center;
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2; /* Ensure label is above the overlay and separator */
`;

// Overlay to improve text visibility
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Semi-transparent black */
  z-index: 1; /* Ensure overlay is below the text */
`;

const C_MensCasualAndFormal = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Section onClick={() => navigate('/C_MensCasual')}>
        <Overlay />
        <BlackLabel>Men's Casual</BlackLabel>
      </Section>
      <Section onClick={() => navigate('/C_MensFormal')}>
        <Overlay />
        <BlackLabel>Men's Formal</BlackLabel>
      </Section>
    </Container>
  );
};

export default C_MensCasualAndFormal;
