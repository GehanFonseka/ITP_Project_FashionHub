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
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
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
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin-bottom: 30px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 220px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
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

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const C_WomensCasualTshirt = () => {
  const [tshirtData, setTshirtData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTshirtData();
  }, []);

  const fetchTshirtData = async () => {
    try {
      const response = await axios.get('/api/wc-tshirts'); // Updated API endpoint for women's casual t-shirts
      setTshirtData(response.data);
    } catch (error) {
      console.error("Error fetching t-shirt data:", error);
    }
  };

  const handleClick = (tshirt) => {
    localStorage.setItem('selectedProduct', JSON.stringify(tshirt));
    localStorage.setItem('productType', 'tshirt'); // Updated product type
    navigate('/product-details');
  };

  return (
    <Container>
      <Heading>Our Women's Casual T-Shirt Collection</Heading>

      <ProductContainer>
        {tshirtData.map(tshirt => (
          <ProductBox key={tshirt.itemNo}>
            <div onClick={() => handleClick(tshirt)} style={{ cursor: 'pointer' }}>
              <ProductImage
                src={`http://localhost:5000/uploads/${tshirt.image}`} // Adjust URL if necessary
                alt={tshirt.name}
                onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
              />
              <ProductInfo>
                {tshirt.name} - LKR {tshirt.price}
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

export default C_WomensCasualTshirt;
