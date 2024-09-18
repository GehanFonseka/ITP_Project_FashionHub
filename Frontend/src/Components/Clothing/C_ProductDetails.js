import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
  font-size: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
`;

const Details = styled.div`
  width: 80%;
  max-width: 600px;
  text-align: center;
`;

const Price = styled.p`
  font-size: 1.4rem;
  color: green;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const ItemNo = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  margin: 10px 0;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }
`;

const C_ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for product type and product data in local storage
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    const productType = localStorage.getItem('productType');

    if (savedProduct) {
      setProduct(savedProduct); // Set the product as the product
    } else {
      // Redirect to the homepage or another page if no item is found
      navigate('/');
    }

    setLoading(false);
  }, [navigate]);

  const handleAddToCart = () => {
    // Logic to add the item to the cart (could be local storage, state management, etc.)
    console.log("Adding to cart:", product);
    alert("Item added to cart!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <Container>
      <Heading>{product.name}</Heading>
      <ItemNo>Item No: {product.itemNo}</ItemNo>
      <Image src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
      <Details>
        <Price>LKR {product.price}</Price>
        <Description>{product.description}</Description>
      </Details>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </Container>
  );
};

export default C_ProductDetails;
