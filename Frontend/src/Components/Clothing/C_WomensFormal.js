import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components';
import C21 from '../../assets/C21.jpg'; 
import C22 from '../../assets/C22.webp'; 

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0; /* Ensure there's no margin affecting the layout */
  padding-top:75px;
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
  cursor: pointer; /* Add pointer cursor on hover */

  // Use background-image property to set different images for each section
  &:first-child {
    background-image: url(${C21}); // Use the new image for Women's Tailor Made
  }
  
  &:last-child {
    background-image: url(${C22}); // Use the new image for Women's Ready Made
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

const C_WomensFormal = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Section onClick={() => handleNavigation('/C_WomensFormalTM')}>
        <Overlay />
        <BlackLabel>Tailor Made</BlackLabel>
      </Section>
      <Section onClick={() => handleNavigation('/C_WomensFormalRM')}>
        <Overlay />
        <BlackLabel>Ready Made</BlackLabel>
      </Section>
    </Container>
  );
};

export default C_WomensFormal;
