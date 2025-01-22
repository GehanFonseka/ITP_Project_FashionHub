import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import C5 from '../../assets/C5.jpg'; 
import C6 from '../../assets/C6.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0; /* Ensure there's no margin affecting the layout */
  position: relative;
  padding-top: 70px;
  flex-wrap: wrap; /* Allow sections to wrap on smaller screens */
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
  height: 100vh; /* Full height for each section */
  transition: background 0.3s ease-in-out;

  &:first-child {
    background-image: url(${C6});
  }
  
  &:last-child {
    background-image: url(${C5});
  }

  /* Add a separator line between sections */
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
    flex: 0 0 50%; /* Stack sections horizontally on medium screens */
    height: 50vh; /* Adjust height for smaller screens */
  }

  @media (max-width: 480px) {
    flex: 0 0 100%; /* Stack sections vertically on small screens */
    height: 50vh; /* Adjust height for small screens */
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
  font-size: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.3rem; /* Adjust font size for medium screens */
  }

  @media (max-width: 480px) {
    font-size: 1.1rem; /* Adjust font size for small screens */
    padding: 15px 0; /* Reduce padding for small screens */
  }
`;

const C_WomensCasualAndFormal = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Section onClick={() => handleNavigation('/C_WomensCasual')}>
        <BlackLabel>Women's Casual</BlackLabel>
      </Section>
      <Section onClick={() => handleNavigation('/C_WomensFormal')}>
        <BlackLabel>Women's Formal</BlackLabel>
      </Section>
    </Container>
  );
};

export default C_WomensCasualAndFormal;
