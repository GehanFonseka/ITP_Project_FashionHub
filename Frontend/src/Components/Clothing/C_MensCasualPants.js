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
        {/* Your footer content here */}
      </Footer>
    </Container>
  );
};

export default C_MensCasualPants;
