import React, { useState } from "react";
import styled from 'styled-components';
import menImage from '../../assets/menImage.jpg'; // Use your own image paths
import womenImage from '../../assets/womenImage.jpg';
import salon from '../../assets/salon.jpg';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroItem>
        <HeroImage src={menImage} alt="Shop Men's Clothing" />
        <HeroTextBox>
          <HeroHeading>Shop Men's Clothing</HeroHeading>
          <p>Unleash Your Inner Fashion Icon – Explore Men's Wear</p>
          <ShopButton href="/C_Home">Shop Now</ShopButton>
        </HeroTextBox>
      </HeroItem>
      <HeroItem>
        <HeroImage src={womenImage} alt="Shop Women's Clothing" />
        <HeroTextBox>
          <HeroHeading>Shop Women's Clothing</HeroHeading>
          <p>Revamp Your Wardrobe – Shop the Latest Women’s Fashion</p>
          <ShopButton href="/C_Home">Shop Now</ShopButton>
        </HeroTextBox>
      </HeroItem>
      <HeroItem wide>
        <HeroImage src={salon} alt="Unisex Salon" />
        <HeroTextBox wide>
          <HeroHeading>Ladies Salon</HeroHeading>
          <p>Your Style, Our Passion</p>
          <ShopButton href="/SalonHome">Book Now</ShopButton>
        </HeroTextBox>
      </HeroItem>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  padding: 60px;
  background-color: #ffffff; /* Light cyan background color for contrast */
`;

const HeroItem = styled.div`
  position: relative;
  width: ${(props) => (props.wide ? '100%' : '48%')}; /* Make salon image twice as wide */
  margin-bottom: 60px; /* Add space between rows */
`;

const HeroImage = styled.img`
  width: 100%;
  border-radius: 10px;
  filter: brightness(70%); /* Darken the image to make the text box more prominent */
`;

const HeroTextBox = styled.div`
  position: absolute;
  bottom: 0; /* Aligns the text box at the bottom */
  left: 0;
  width: ${(props) => (props.wide ? '100%' : '100%')}; /* Make text box full width of the image */
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #ffffff; /* White text color inside the box */
  text-align: center;
  box-sizing: border-box; /* Ensures padding doesn't affect the width */
`;

const HeroHeading = styled.h2`
  color: #e0f7fa; /* Bright cyan color for high visibility */
  margin-bottom: 10px;
  text-shadow: none; /* Removing text shadow to let the box do the work */
`;

const ShopButton = styled.a`
  display: inline-block;
  margin-top: 10px;
   text-align: center;
  padding: 10px 20px;
  background-color: #8b0000; /* Bright green button for strong contrast and visibility */
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Adds a subtle shadow for depth */
`;
