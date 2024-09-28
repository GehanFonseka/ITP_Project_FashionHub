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
  margin-top: 70px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin-bottom: 50px;
`;

const ProductBox = styled.div`
  width: 30%;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
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
`;

const Footer = styled.footer`
  margin-top: 30px;
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
