import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  padding-top: 70px;
  padding-bottom: 50px;
`;

// Heading section
const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
`;

// Review section display
const ReviewDisplay = styled.div`
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #555;
  width: 60%;
  max-width: 500px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Measurement list item
const MeasurementItem = styled.div`
  margin-bottom: 10px;
  color: #333;
`;

// Add to Cart button
const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #555;
  }
`;

const C_MensTMBlazerAddCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting data from state
  const { blazerType, selectedColor, measurements } = location.state || {};

  const handleAddToCart = () => {
    // Logic to add item to cart (e.g., update state, context, or send to server)
    alert('Blazer added to cart successfully!');
    navigate('/cart'); // Navigate to the cart or home page after adding
  };

  return (
    <Container>
      <Heading>Review Your Selection</Heading>
      <ReviewDisplay>
        <h3>Blazer Type: {blazerType}</h3>
        <h3>Selected Color: {selectedColor}</h3>
        <h4>Measurements:</h4>
        {measurements ? (
          Object.entries(measurements).map(([key, value]) => (
            <MeasurementItem key={key}>
              <strong>{key}:</strong> {value} inches
            </MeasurementItem>
          ))
        ) : (
          <p>No measurements provided.</p>
        )}
      </ReviewDisplay>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </Container>
  );
};

export default C_MensTMBlazerAddCart;
