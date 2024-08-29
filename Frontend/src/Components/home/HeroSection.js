import React from "react";
import styled from 'styled-components';
import menImage from '../../assets/menImage.jpg'; // Use your own image paths
import womenImage from '../../assets/womenImage.jpg';
import salon from '../../assets/salon.jpg';

const HeroSection = () => {
  return (
    <div>
      <HeroContainer>
        <HeroItem>
          <HeroImage src={menImage} alt="Shop Men's Clothing" />
          <HeroTextBox>
            <HeroHeading>Shop Men's Clothing</HeroHeading>
            <p>Unleash Your Inner Fashion Icon – Explore Men's Wear</p>
            <ShopButton href="#">Shop Now</ShopButton>
          </HeroTextBox>
        </HeroItem>
        <HeroItem>
          <HeroImage src={womenImage} alt="Shop Women's Clothing" />
          <HeroTextBox>
            <HeroHeading>Shop Women's Clothing</HeroHeading>
            <p>Revamp Your Wardrobe – Shop the Latest Women’s Fashion</p>
            <ShopButton href="#">Shop Now</ShopButton>
          </HeroTextBox>
        </HeroItem>
        <HeroItem wide>
          <HeroImage src={salon} alt="Unisex Salon" />
          <HeroTextBox wide>
            <HeroHeading>Unisex Salon</HeroHeading>
            <p>Your Style, Our Passion</p>
            <ShopButton href="#">Book Now</ShopButton>
          </HeroTextBox>
        </HeroItem>
      </HeroContainer>

      
    </div>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  padding: 60px;
  background-color: #ffffff;
`;

const HeroItem = styled.div`
  position: relative;
  width: ${(props) => (props.wide ? '100%' : '48%')};
  margin-bottom: 60px;
`;

const HeroImage = styled.img`
  width: 100%;
  border-radius: 10px;
  filter: brightness(70%);
`;

const HeroTextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${(props) => (props.wide ? '100%' : '100%')};
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #ffffff;
  text-align: center;
  box-sizing: border-box;
`;

const HeroHeading = styled.h2`
  color: #e0f7fa;
  margin-bottom: 10px;
  text-shadow: none;
`;

const ShopButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  text-align: center;
  padding: 10px 20px;
  background-color: #8b0000;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;



