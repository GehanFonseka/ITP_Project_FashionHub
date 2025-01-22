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
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
  color: #333;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 80%;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductBox = styled.div`
  width: 30%;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 100%;
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
  font-weight: bold;
`;

const Footer = styled.footer`
  margin-top: 30px;
  text-align: center;
  color: #777;
`;

const F_MensFormalOfficeShoes = () => {
  const [officeShoesData, setOfficeShoesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOfficeShoesData();
  }, []);

  const fetchOfficeShoesData = async () => {
    try {
      const response = await axios.get('/api/officeshoes'); // Update the API endpoint
      setOfficeShoesData(response.data);
    } catch (error) {
      console.error("Error fetching office shoes data:", error);
    }
  };

  const handleClick = (officeShoes) => {
    localStorage.setItem('selectedProduct', JSON.stringify(officeShoes));
    localStorage.setItem('productType', 'officeshoes');
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Formal Office Shoes Collection</Heading>

      <ProductContainer>
        {officeShoesData.map(officeShoes => (
          <ProductBox key={officeShoes.itemNo}>
            <div onClick={() => handleClick(officeShoes)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${officeShoes.image}`}
                alt={officeShoes.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'}
              />
              <ProductInfo>
                {officeShoes.name} - LKR {officeShoes.price}
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

export default F_MensFormalOfficeShoes;
