import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  margin-top: 90px;
  gap: 40px;
  min-height: calc(100vh - 100px);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Details = styled.div`
  flex: 1;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Price = styled.p`
  font-size: 1.4rem;
  color: green;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ItemNo = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  margin: 10px 0;
`;

const AvailableQuantity = styled.p`
  font-size: 1.2rem;
  color: #333;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    border-color: #28a745;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin: 5px 0;
  color: #555;
`;

const C_ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const navigate = useNavigate();

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (savedProduct) {
      setProduct(savedProduct);
      console.log("Saved Product:", savedProduct); // Debugging output
    } else {
      navigate("/");
    }

    setLoading(false);
  }, [navigate]);

  const handleAddToCart = async (product, quantity, size) => {
    const cartItem = {
      ItemsN: product.name,
      price: product.price,
      quantity: quantity,
      image: [product.image], // Assuming product.image is a string, but the schema expects an array
      sellerNo: product.sellerNo || 0, // If sellerNo is not available in product, default to 0
    };

    try {
      const response = await fetch("http://localhost:5000/api/items/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Item added to cart:", result);
      } else {
        console.error("Failed to add item to cart:", result);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }

    navigate("/cart", { state: cartItem });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const availableQuantity = product.quantity;

  return (
    <Container>
      <ImageContainer>
        <Image
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
        />
      </ImageContainer>
      <Details>
        <Heading>{product.name}</Heading>
        <ItemNo>Item No: {product.itemNo}</ItemNo>
        <Description>{product.description}</Description>
        <Price>LKR {product.price}</Price>
        <AvailableQuantity>Available Quantity: {availableQuantity}</AvailableQuantity>

        {/* Size Selector */}
        <Label htmlFor="size">Size:</Label>
        <Select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </Select>

        {/* Quantity Selector */}
        <Label htmlFor="quantity">Select Quantity:</Label>
        <Select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(availableQuantity).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </Select>

        <AddToCartButton
          onClick={() => handleAddToCart(product, quantity, size)}
          disabled={quantity > availableQuantity}
        >
          Add to Cart
        </AddToCartButton>
      </Details>
    </Container>
  );
};

export default C_ProductDetails;
