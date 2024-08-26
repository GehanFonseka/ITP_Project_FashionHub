import React from 'react';
import styled from 'styled-components';
import C26 from '../../assets/C26.jpg'; // Denims
import C27 from '../../assets/C27.jpg'; 
import C28 from '../../assets/C28.jpeg'; 
import C29 from '../../assets/C29.webp'; // Chinos
import C30 from '../../assets/C30.jpg'; 
import C31 from '../../assets/C31.jpeg'; 
import C32 from '../../assets/C32.webp'; // Cargo Pants
import C33 from '../../assets/C33.webp'; 
import C34 from '../../assets/C34.webp'; 
import C35 from '../../assets/C35.jpg'; 
import C36 from '../../assets/C36.jpg'; 
import C37 from "../../assets/C37.jpg";
import C38 from "../../assets/C38.jpg";
import C39 from "../../assets/C39.webp";
import C40 from "../../assets/C40.jpg";


// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto; /* Change from 100vh to auto */
  margin: 0;
  padding-top: 50px;
`;

// Quote section
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;
`;

// Section for each category
const Section = styled.div`
  width: 80%;
  margin-bottom: 50px;
`;

// Section title
const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.6rem;
  text-align: center;
`;

// Container for product items (Horizontal scrolling for Denims)
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* No wrapping for horizontal scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
  scroll-behavior: smooth; /* Smooth scrolling */
`;

// Styled image box for products with name and price
const ProductBox = styled.div`
  flex: 0 0 auto; /* Prevent the boxes from shrinking or growing */
  width: 30%; /* Adjust the width as needed */
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ddd; /* Add a border to define the box */
  border-radius: 8px;
  overflow: hidden;
`;

// Product image
const ProductImage = styled.img`
  width: 100%;
  height: 270px; /* Fixed height for consistency */
  object-fit: cover; /* Ensure images cover the box without distortion */
`;

// Product name and price
const ProductInfo = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  color: #333;
`;

const C_MensCasualPants = () => {
  return (
    <Container>
      <Quote>Discover Your Perfect Fit – Tailored for Every Occasion</Quote>
      
      <Section>
        <SectionTitle>Denims</SectionTitle>
        <ProductContainer>
          <ProductBox>
            <ProductImage src={C26} alt="Denim 1" />
            <ProductInfo>Albert RS.A Jean Pants Slim Fit - LKR 20,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C27} alt="Denim 2" />
            <ProductInfo>L’Homme Skinny Mid Rise Denim - LKR 53,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C28} alt="Denim 3" />
            <ProductInfo>511™ Slim Fit Men's Jeans - LKR 60,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C35} alt="Denim 4" />
            <ProductInfo>New Denim Style 1 - LKR 55,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C36} alt="Denim 5" />
            <ProductInfo>New Denim Style 2 - LKR 65,000</ProductInfo>
          </ProductBox>
        </ProductContainer>
      </Section>
      
      <Section>
        <SectionTitle>Chinos</SectionTitle>
        <ProductContainer>
          <ProductBox>
            <ProductImage src={C29} alt="Chino 1" />
            <ProductInfo>Tapered Fit - LKR 8,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C30} alt="Chino 2" />
            <ProductInfo>Pantalón chino slim fit - LKR 12,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C31} alt="Chino 3" />
            <ProductInfo>GUESS Skinny fit - LKR 7,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C37} alt="Chino 4" />
            <ProductInfo>GUESS Skinny fit - LKR 7,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C38} alt="Chino 5" />
            <ProductInfo>GUESS Skinny fit - LKR 7,000</ProductInfo>
          </ProductBox>
        </ProductContainer>
      </Section>
      
      <Section>
        <SectionTitle>Cargo Pants</SectionTitle>
        <ProductContainer>
          <ProductBox>
            <ProductImage src={C32} alt="Cargo 1" />
            <ProductInfo>XFLWAM Men's - LKR 13,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C33} alt="Cargo 2" />
            <ProductInfo>XFLWAM Men's - LKR 11,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C34} alt="Cargo 3" />
            <ProductInfo>GORNATION Men's - LKR 18,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C39} alt="Cargo 4" />
            <ProductInfo>GORNATION Men's - LKR 18,000</ProductInfo>
          </ProductBox>
          <ProductBox>
            <ProductImage src={C40} alt="Cargo 5" />
            <ProductInfo>GORNATION Men's - LKR 18,000</ProductInfo>
          </ProductBox>
        </ProductContainer>
      </Section>
    </Container>
  );
};

export default C_MensCasualPants;
