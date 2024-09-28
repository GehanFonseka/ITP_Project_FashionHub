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

const F_WomensCasualBoots = () => {
  const [bootsData, setBootsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBootsData();
  }, []);

  const fetchBootsData = async () => {
    try {
      const response = await axios.get('/api/boots');
      setBootsData(response.data);
    } catch (error) {
      console.error("Error fetching boots data:", error);
    }
  };

  const handleClick = (boots) => {
    localStorage.setItem('selectedProduct', JSON.stringify(boots));
    localStorage.setItem('productType', 'boots');
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Boots Collection</Heading>

      <ProductContainer>
        {bootsData.map(boots => (
          <ProductBox key={boots.itemNo}>
            <div onClick={() => handleClick(boots)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${boots.image}`}
                alt={boots.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'}
              />
              <ProductInfo>
                {boots.name} - LKR {boots.price}
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

export default F_WomensCasualBoots;
