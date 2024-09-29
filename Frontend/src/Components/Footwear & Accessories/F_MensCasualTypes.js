import React from 'react';
import styled from 'styled-components';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
`;

// Product container
const ProductRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 80%;
`;

// Individual product image box
const ImageBox = styled.div`
  width: 45%;
  height: 200px;  /* Adjust as needed */
  background-size: cover;
  background-position: center;
  margin: 0 10px;
`;

const F_MensCasualTypes = () => {
  return (
    <Container>
      {[...Array(7)].map((_, index) => (
        <ProductRow key={index}>
          <ImageBox style={{ backgroundImage: `url(/path/to/image1.jpg)` }} />
          <ImageBox style={{ backgroundImage: `url(/path/to/image2.jpg)` }} />
        </ProductRow>
      ))}
    </Container>
  );
};

export default F_MensCasualTypes;
