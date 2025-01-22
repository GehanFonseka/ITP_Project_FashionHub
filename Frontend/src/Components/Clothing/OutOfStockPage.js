import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 200px;
  margin-bottom: 150px;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const OutOfStockPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Heading>Sorry, this product is out of stock</Heading>
      <Message>We apologize for the inconvenience. Please check back later.</Message>
      <BackButton onClick={() => navigate("/")}>Go Back to Home</BackButton>
    </Container>
  );
};

export default OutOfStockPage;
