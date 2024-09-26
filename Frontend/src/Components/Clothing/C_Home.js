import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import C1 from '../../assets/C1.jpg'; 
import C2 from '../../assets/C2.webp';

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
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
    background-image: url(${C2});
  }
  
  &:last-child {
    background-image: url(${C1});
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

const C_Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Side onClick={() => handleNavigation('/C_WomensCasualAndFormal')}>
        <Label>Women's Clothing</Label>
      </Side>
      <Side onClick={() => handleNavigation('/C_MensCasualAndFormal')}>
        <Label>Men's Clothing</Label>
      </Side>
    </Container>
  );
};

export default C_Home;
