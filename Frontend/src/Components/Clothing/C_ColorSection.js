import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const colors = [
  { color: '#000000', name: 'Black', description: 'Classic and timeless, perfect for any formal occasion.' },
  { color: '#1A1A1A', name: 'Charcoal', description: 'A deep, rich color that exudes confidence and sophistication.' },
  { color: '#5B5B5B', name: 'Gray', description: 'Versatile and elegant, suitable for both casual and formal settings.' },
  { color: '#B9B9B9', name: 'Light Gray', description: 'A lighter shade for a modern, stylish look.' },
  { color: '#FFFFFF', name: 'White', description: 'Bold and striking, perfect for making a statement.' },
  { color: '#274C77', name: 'Navy Blue', description: 'A strong, reliable color, perfect for the professional look.' },
  { color: '#FF6F61', name: 'Coral', description: 'Vibrant and lively, for those who like to stand out.' },
  { color: '#FFD700', name: 'Gold', description: 'Luxurious and eye-catching, ideal for special occasions.' }
];

// Define styled components
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

const Heading = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
`;

const ProductInfo = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const ProductName = styled.h3`
  color: #333;
  font-size: 1.5rem;
`;

const ProductPrice = styled.p`
  color: #555;
  font-size: 1.2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
  margin-bottom: 30px;
`;

const ColorOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '3px solid #333' : '1px solid #ccc')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.3s;

  &:hover {
    border: 3px solid #555;
  }
`;

const ColorDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
`;

const ColorText = styled.div`
  color: #333;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
  border: 3px solid ${(props) => (props.isSelected ? props.borderColor : 'transparent')};
  transition: border-color 0.3s;
`;

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

const ColorSelection = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { itemType, item } = location.state || {}; // Destructure itemType and item from state

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleNextClick = () => {
    if (selectedColor) {
      const measurementPath = itemType === 'Blazer' 
        ? '/C_MensTMBlazerMeasurements' 
        : '/C_WomensTMTrouserMeasurements';
      navigate(measurementPath, { 
        state: { 
          item, 
          selectedColor: selectedColor.name 
        } 
      });
    } else {
      alert('Please select a color before proceeding.');
    }
  };

  return (
    <Container>
      <Heading>Select Color</Heading>
      <ProductInfo>
        <ProductName>{item?.name}</ProductName>
        <ProductPrice>Price: ${item?.price}</ProductPrice>
      </ProductInfo>
      <MainContent>
        <ColorOptions>
          {colors.map((color, index) => (
            <ColorContainer key={index}>
              <ColorBox
                color={color.color}
                isSelected={selectedColor?.name === color.name}
                onClick={() => handleColorClick(color)}
              />
              <ColorDescription>
                <ColorText
                  isSelected={selectedColor?.name === color.name}
                  borderColor={color.color}
                >
                  <h3>{color.name}</h3>
                  <p>{color.description}</p>
                </ColorText>
              </ColorDescription>
            </ColorContainer>
          ))}
        </ColorOptions>
      </MainContent>
      <NextButton onClick={handleNextClick}>Next</NextButton>
    </Container>
  );
};

export default ColorSelection;
