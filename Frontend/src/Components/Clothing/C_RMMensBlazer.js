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
  font-size: 2rem; /* Increased font size */
  color: #333;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 50px;
`;

const ProductBox = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 15px;
  font-size: 1.2rem;
  color: #444;
  font-weight: bold;
`;

const Footer = styled.footer`
  margin-top: 30px;
  text-align: center;
  font-size: 1rem;
  color: #555;
`;

const C_RMMensBlazer = () => {
  const [blazerData, setBlazerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlazerData();
  }, []);

  const fetchBlazerData = async () => {
    try {
      const response = await axios.get('/api/rm-mensblazers');
      setBlazerData(response.data);
    } catch (error) {
      console.error("Error fetching blazer data:", error);
    }
  };

  const handleClick = (blazer) => {
    localStorage.setItem('selectedProduct', JSON.stringify(blazer));
    localStorage.setItem('productType', 'blazer');
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Ready-Made Men's Blazers</Heading>

      <ProductContainer>
        {blazerData.map(blazer => (
          <ProductBox key={blazer.itemNo}>
            <div onClick={() => handleClick(blazer)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${blazer.image}`}
                alt={blazer.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
              />
              <ProductInfo>
                {blazer.name} - LKR {blazer.price}
              </ProductInfo>
            </div>
          </ProductBox>
        ))}
      </ProductContainer>

      <Footer>
        {/* Your footer content here */}
        <p>&copy; 2025 Your Store. All Rights Reserved.</p>
      </Footer>
    </Container>
  );
};

export default C_RMMensBlazer;
