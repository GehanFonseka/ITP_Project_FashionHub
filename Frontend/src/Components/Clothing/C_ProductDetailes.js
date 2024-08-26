import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import C26 from '../../assets/C26.jpg'; // Example image
import C27 from '../../assets/C27.jpg'; 
import C28 from '../../assets/C28.jpeg'; 
import C29 from '../../assets/C29.webp'; 
import C30 from '../../assets/C30.jpg'; 
import C31 from '../../assets/C31.jpeg'; 
import C32 from '../../assets/C32.webp'; 
import C33 from '../../assets/C33.webp'; 
import C34 from '../../assets/C34.webp'; 
import C35 from '../../assets/C35.jpg'; 
import C36 from '../../assets/C36.jpg'; 
import C37 from "../../assets/C37.jpg";
import C38 from "../../assets/C38.jpg";
import C39 from "../../assets/C39.webp";
import C40 from "../../assets/C40.jpg";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SizeSelector = styled.select`
  margin-top: 20px;
  padding: 10px;
`;

const AddToCartButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // Example product data
  const productData = {
    '1': { image: C26, name: 'Albert RS.A Jean Pants Slim Fit', price: 'LKR 20,000', description: 'High quality denim pants.', sizes: ['S', 'M', 'L', 'XL'] },
    '2': { image: C27, name: 'L’Homme Skinny Mid Rise Denim', price: 'LKR 53,000', description: 'Comfortable and stylish denim.', sizes: ['S', 'M', 'L', 'XL'] },
    '3': { image: C28, name: '511™ Slim Fit Men\'s Jeans', price: 'LKR 60,000', description: 'Classic slim fit jeans.', sizes: ['S', 'M', 'L', 'XL'] },
    // Add more products as needed
  };

  useEffect(() => {
    // Fetch product data based on productId from URL
    setProduct(productData[productId]);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <ProductImage src={product.image} alt={product.name} />
      <ProductInfo>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <SizeSelector>
          {product.sizes.map(size => <option key={size} value={size}>{size}</option>)}
        </SizeSelector>
        <AddToCartButton>Add to Cart</AddToCartButton>
      </ProductInfo>
    </Container>
  );
};

export default ProductDetailPage;
