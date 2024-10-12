import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Define styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  margin-top: 70px;
  gap: 40px; /* Adds space between the image and details */
  min-height: calc(100vh - 100px); /* Ensures space above the footer */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const Details = styled.div`
  flex: 1;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 50px; /* Adds space between details and footer */
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
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

const SizeSelect = styled.select`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.2rem;
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

const SizeChartContainer = styled.div`
  margin-top: 20px;
`;

const SizeChart = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const A_ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [selectedSize, setSelectedSize] = useState(""); // State for selected ring size
  const navigate = useNavigate();

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (savedProduct) {
      setProduct(savedProduct); // Set the product as the product
    } else {
      navigate('/'); // Redirect to homepage if no item found
    }

    setLoading(false);
  }, [navigate]);

  const handleAddToCart = async (product, quantity, size) => {
    const cartItem = {
      ItemsN: product.name,
      price: product.price,
      quantity: quantity,
      image: [product.image],  // Assuming product.image is a string, but the schema expects an array
      sellerNo: product.sellerNo || 0,  // If sellerNo is not available in product, default to 0
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/items/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Item added to cart:', result);
      } else {
        console.error('Failed to add item to cart:', result);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }

    navigate('/cart', { state: cartItem });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
      </ImageContainer>
      <Details>
        <Heading>{product.name}</Heading>
        <ItemNo>Item No: {product.itemNo}</ItemNo>
        <Description>{product.description}</Description>
        <Price>LKR {product.price}</Price>

        {/* Ring size dropdown */}
        <SizeSelect value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Select Ring Size</option>
          <option value="5">Size 5</option>
          <option value="6">Size 6</option>
          <option value="7">Size 7</option>
          <option value="8">Size 8</option>
          <option value="9">Size 9</option>
        </SizeSelect>

        <AddToCartButton
          onClick={() => handleAddToCart(product, quantity, size)}
          
        >
          Add to Cart
        </AddToCartButton>

        {/* Ring Size Chart */}
        <SizeChartContainer>
          <h3>Ring Size Chart</h3>
          <SizeChart>
            <thead>
              <tr>
                <th>US Size</th>
                <th>UK Size</th>
                <th>EU Size</th>
                <th>Diameter (mm)</th>
                <th>Circumference (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td>J 1/2</td>
                <td>49</td>
                <td>15.7</td>
                <td>49.3</td>
              </tr>
              <tr>
                <td>6</td>
                <td>L 1/2</td>
                <td>51</td>
                <td>16.5</td>
                <td>51.8</td>
              </tr>
              <tr>
                <td>7</td>
                <td>N 1/2</td>
                <td>54</td>
                <td>17.3</td>
                <td>54.4</td>
              </tr>
              <tr>
                <td>8</td>
                <td>P 1/2</td>
                <td>57</td>
                <td>18.1</td>
                <td>57.0</td>
              </tr>
              <tr>
                <td>9</td>
                <td>R 1/2</td>
                <td>59</td>
                <td>18.9</td>
                <td>59.5</td>
              </tr>
            </tbody>
          </SizeChart>
        </SizeChartContainer>
      </Details>
    </Container>
  );
};

export default A_ProductDetails;
