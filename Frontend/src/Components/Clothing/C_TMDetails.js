import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Define all styled components at the top of the file
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: #f4f4f4;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem;
  text-align: center;
`;

const DetailsCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const DetailsDisplay = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;

const MeasurementList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const MeasurementItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #444;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  color: #666;
`;

const AddToCartButton = styled.button`
  padding: 12px 24px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #555;
  }
`;

// Component definition
const C_TMDetails = () => {
  const location = useLocation();
  const { item, selectedColor, measurements } = location.state || {}; // Destructure item, selectedColor, and measurements from state
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Handle adding the item to the cart (you might want to navigate to a cart page or trigger an API call)
    console.log('Adding to cart:', { item, selectedColor, measurements });
    navigate('/cart'); // Example: navigate to a cart page
  };

  if (!item) return <p>No item data found.</p>;

  return (
    <Container>
      <Heading>Tailor-Made Details</Heading>
      <DetailsCard>
        <DetailsDisplay>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Price:</strong> LKR{item.price}</p>
          <p><strong>Selected Color:</strong> {selectedColor}</p>
          <h3>Measurements:</h3>
          <MeasurementList>
            {Object.entries(measurements).map(([key, value]) => (
              <MeasurementItem key={key}>
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}:</Label>
                <Value>{value}</Value>
              </MeasurementItem>
            ))}
          </MeasurementList>
        </DetailsDisplay>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </DetailsCard>
    </Container>
  );
};

export default C_TMDetails;
