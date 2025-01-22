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
  
  @media (max-width: 768px) {
    margin-top: 60px; /* Adjust margin for mobile */
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.3rem; /* Adjust font size for mobile */
    margin-bottom: 15px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    width: 100%; /* Ensure full width on mobile */
    justify-content: space-evenly; /* Adjust product distribution */
  }
`;

const ProductBox = styled.div`
  width: 30%;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 45%; /* Adjust product width for mobile */
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    width: 100%; /* Full width for very small screens */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 230px; /* Adjust image height for mobile */
  }
  
  @media (max-width: 480px) {
    height: 200px; /* Smaller image height for small screens */
  }
`;

const ProductInfo = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for mobile */
  }
`;

const Footer = styled.footer`
  margin-top: 30px;
  
  @media (max-width: 768px) {
    margin-top: 20px; /* Adjust footer margin for mobile */
  }
`;

const A_MensCandB = () => {
  const [candBData, setCandBData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandBData();
  }, []);

  const fetchCandBData = async () => {
    try {
      const response = await axios.get('/api/chainsandbracelets'); // Adjust endpoint as necessary
      setCandBData(response.data);
    } catch (error) {
      console.error("Error fetching CandB data:", error);
    }
  };

  const handleClick = (candB) => {
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem('selectedProduct', JSON.stringify(candB));
    localStorage.setItem('productType', 'candB');
    localStorage.setItem('clickDate', currentDate);
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Chains & Bracelets Collection</Heading>

      <ProductContainer>
        {candBData.map(candB => (
          <ProductBox key={candB.itemNo}>
            <div onClick={() => handleClick(candB)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${candB.image}`}
                alt={candB.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Update this to your placeholder image path
              />
              <ProductInfo>
                {candB.name} - LKR {candB.price}
              </ProductInfo>
            </div>
          </ProductBox>
        ))}
      </ProductContainer>

      <Footer>
        {/* Your footer content here */}
      </Footer>
    </Container>
  );
};

export default A_MensCandB;
