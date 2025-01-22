import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import C3 from '../../assets/C3.jpg'; 
import C4 from '../../assets/C4.webp';

// Container for the entire page
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding-top: 70px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
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
  height: 100vh; /* Ensure sections take full height */
  transition: background 0.3s ease-in-out; /* Smooth background transition */

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
    width: 4px;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex: 0 0 50%; /* Stack sections on medium screens */
    height: 50vh; /* Adjust height for smaller screens */
  }

  @media (max-width: 480px) {
    flex: 0 0 100%; /* Stack sections on small screens */
    height: 50vh; /* Adjust height further for small screens */
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
