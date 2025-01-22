import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../utilities/axios';
import styled from 'styled-components';

// Define styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 90px;
  background-color: #f9f9f9;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin-bottom: 50px;
  gap: 20px; /* Space between product boxes */

  @media (max-width: 768px) {
    width: 100%;
    gap: 15px; /* Smaller gap on mobile */
  }
`;

const ProductBox = styled.div`
  width: 30%;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45%; /* Adjust size for smaller screens */
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width for very small screens */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

const ProductInfo = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  color: #333;
  background-color: #fff;
`;

const Footer = styled.footer`
  margin-top: 30px;
  text-align: center;
  font-size: 1rem;
  color: #777;
`;

const F_MensCasualSneakers = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSneakersData();
  }, []);

  const fetchSneakersData = async () => {
    try {
      const response = await axios.get('/api/sneakers');
      setSneakersData(response.data);
    } catch (error) {
      console.error("Error fetching sneakers data:", error);
    }
  };

  const handleClick = (sneakers) => {
    localStorage.setItem('selectedProduct', JSON.stringify(sneakers));
    localStorage.setItem('productType', 'sneakers');
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Sneakers Collection</Heading>

      <ProductContainer>
        {sneakersData.map(sneakers => (
          <ProductBox key={sneakers.itemNo} onClick={() => handleClick(sneakers)}>
            <ProductImage
              src={`http://localhost:5000/uploads/${sneakers.image}`}
              alt={sneakers.name}
              onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'}
            />
            <ProductInfo>
              {sneakers.name} - LKR {sneakers.price}
            </ProductInfo>
          </ProductBox>
        ))}
      </ProductContainer>

      <Footer>
        {/* Your footer content here */}
      </Footer>
    </Container>
  );
};

export default F_MensCasualSneakers;
