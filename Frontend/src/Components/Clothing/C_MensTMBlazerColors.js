import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding-top: 70px;
  padding-bottom: 50px;
  position: relative;
`;

// Quote or heading section
const Heading = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
`;

// Main content area for color selection and description
const MainContent = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 30px;
`;

// Color options container for vertical alignment
const ColorOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  margin-right: 20px;
`;

// Container for each color and its description
const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// Each color box
const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '3px solid #333' : '1px solid #ccc')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.3s;

  &:hover {
    border: 3px solid #555;
  }
`;

// Description box next to each color
const ColorDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
`;

// Individual color description text
const ColorText = styled.div`
  color: #333;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 500%;
  max-width: 4000px;
  border: 3px solid ${(props) => (props.isSelected ? props.borderColor : 'transparent')};
  transition: border-color 0.3s;
`;

// Styled Next button
const NextButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const C_MensTMBlazerColors = () => {
  const [selectedColor, setSelectedColor] = useState(null); // Now stores the entire object
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state
  const { blazerType } = location.state || {}; // Destructure blazerType from state

  const blazerColors = [
    { color: '#000000', name: 'Black', description: 'Classic and timeless, perfect for any formal occasion.' },
    { color: '#1A1A1A', name: 'Charcoal', description: 'A deep, rich color that exudes confidence and sophistication.' },
    { color: '#5B5B5B', name: 'Gray', description: 'Versatile and elegant, suitable for both casual and formal settings.' },
    { color: '#B9B9B9', name: 'Light Gray', description: 'A lighter shade for a modern, stylish look.' },
    { color: '#FFFFFF', name: 'White', description: 'Bold and striking, perfect for making a statement.' },
    { color: '#274C77', name: 'Navy Blue', description: 'A strong, reliable color, perfect for the professional look.' },
    { color: '#FF6F61', name: 'Coral', description: 'Vibrant and lively, for those who like to stand out.' },
    { color: '#FFD700', name: 'Gold', description: 'Luxurious and eye-catching, ideal for special occasions.' }
  ];

  const handleColorClick = (blazer) => {
    setSelectedColor(blazer); // Store the entire blazer object
  };

  const handleNextClick = () => {
    if (selectedColor) {
      // Pass both blazer type and selected color to the next page
      navigate('/C_MensTMBlazerMeasurements', { state: { blazerType, selectedColor: selectedColor.name } });
    } else {
      alert('Please select a color before proceeding.');
    }
  };

  return (
    <Container>
      <Heading>Select Color</Heading>
      <MainContent>
        <ColorOptions>
          {blazerColors.map((blazer, index) => (
            <ColorContainer key={index}>
              <ColorBox
                color={blazer.color}
                isSelected={selectedColor?.name === blazer.name}
                onClick={() => handleColorClick(blazer)}
              />
              <ColorDescription>
                <ColorText
                  isSelected={selectedColor?.name === blazer.name}
                  borderColor={blazer.color}
                >
                  <h3>{blazer.name}</h3>
                  <p>{blazer.description}</p>
                </ColorText>
              </ColorDescription>
            </ColorContainer>
          ))}
        </ColorOptions>
      </MainContent>

      {/* Next button */}
      <NextButton onClick={handleNextClick}>Next</NextButton>
    </Container>
  );
};

export default C_MensTMBlazerColors;
