import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../utilities/axios'; 
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 70px;
`;

const Heading = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-align: center;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* Added gap for spacing */
  width: 100%; /* Full width */
  max-width: 1200px; /* Limit max width for large screens */
`;

const ProductBox = styled.div`
  width: 30%; /* Default width for larger screens */
  max-width: 300px; /* Max width for consistent design */
  min-width: 200px; /* Minimum width to prevent excessive shrinking */
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 45%; /* Adjust for tablet screens */
  }

  @media (max-width: 480px) {
    width: 90%; /* Full width on small screens */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Footer = styled.footer`
  margin-top: 30px;
  text-align: center;
  font-size: 0.9rem;
  color: #777;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const C_MensCasualPants = () => {
  const [pantsData, setPantsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPantsData();
  }, []);

  const fetchPantsData = async () => {
    try {
      const response = await axios.get('/api/pants');
      setPantsData(response.data);
    } catch (error) {
      console.error("Error fetching pants data:", error);
    }
  };

  const handleClick = (pants) => {
    localStorage.setItem('selectedProduct', JSON.stringify(pants));
    localStorage.setItem('productType', 'pants');
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Pants Collection</Heading>

      <ProductContainer>
        {pantsData.map(pants => (
          <ProductBox key={pants.itemNo}>
            <div onClick={() => handleClick(pants)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${pants.image}`}
                alt={pants.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'}
              />
              <ProductInfo>
                {pants.name} - LKR {pants.price}
              </ProductInfo>
            </div>
          </ProductBox>
        ))}
      </ProductContainer>

      <Footer>
        © 2025 Your Company Name. All Rights Reserved.
      </Footer>
    </Container>
  );
};

export default C_MensCasualPants;
