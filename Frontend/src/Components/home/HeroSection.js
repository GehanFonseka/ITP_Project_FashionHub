import React from "react";
import styled from 'styled-components';
import menImage from '../../assets/menImage.jpg'; // Use your own image paths
import womenImage from '../../assets/womenImage.jpg';
import salon from '../../assets/salon1.jpg';
import Heroboots from '../../assets/Heroboots.jpg';  // Images for the new sections
import Herosneakers from '../../assets/Herosneakers.jpg';
import Herowatch from '../../assets/Herowatch.jpg';

// Move styled components above the component definition
const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  padding: 60px;
  background-color: #ffffff; /* Light cyan background color for contrast */
  position: relative; /* To allow positioning of Find My Outfit button */
`;

const HeroItem = styled.div`
  position: relative;
  width: ${(props) => (props.wide ? '100%' : '48%')}; /* Make salon image wider */
  margin-bottom: 60px; /* Add space between rows */
`;

const SneakersBootsWatchesRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 60px; /* Space between this row and the next sections */
`;

const EqualItem = styled.div`
  width: 32%; /* Ensure each item takes up 32% of the row */
  position: relative;
  height: 350px; /* Fixed height for uniformity */
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%; /* Make the image fill the box */
  object-fit: cover; /* Ensure the image covers the box proportionally */
  border-radius: 10px;
  filter: brightness(70%); /* Darken the image to make the text box more prominent */
`;

const HeroTextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${(props) => (props.small ? '10px 15px' : '15px 20px')}; /* Conditional padding for sneakers, boots, watches */
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #ffffff;
  text-align: center;
  box-sizing: border-box;
`;

const HeroHeading = styled.h2`
  color: #e0f7fa;
  margin-bottom: ${(props) => (props.small ? '5px' : '10px')}; /* Reduced margin for sneakers, boots, watches */
  font-size: ${(props) => (props.small ? '18px' : '24px')}; /* Conditional font size for smaller sections */
`;

const HeroDescription = styled.p`
  font-size: ${(props) => (props.small ? '14px' : '16px')}; /* Conditional font size for description */
  margin-bottom: ${(props) => (props.small ? '5px' : '10px')}; /* Reduced margin for description */
`;

const ShopButton = styled.a`
  display: inline-block;
  margin-top: ${(props) => (props.small ? '5px' : '10px')}; /* Conditional margin for buttons */
  text-align: center;
  padding: ${(props) => (props.small ? '8px 15px' : '10px 20px')}; /* Conditional padding for smaller buttons */
  background-color: #8b0000;
  color: #ffffff;
  text-decoration: none;
  font-size: ${(props) => (props.small ? '12px' : '14px')}; /* Conditional font size for buttons */
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const FindOutfitButton = styled.a`
  position: absolute;
  bottom: -40px;
  right: 0;
  padding: 10px 20px;
  background-color: #008080;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006666;
  }
`;

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

      {/* Sneakers, Boots, and Watches Row */}
      <SneakersBootsWatchesRow>
        <EqualItem>
          <HeroImage src={Herosneakers} alt="Shop Casual Sneakers" />
          <HeroTextBox small>
            <HeroHeading small>Shop Casual Sneakers</HeroHeading>
            <HeroDescription small>Step into Comfort – Trendy Sneakers for Every Occasion</HeroDescription>
            <ShopButton small href="/SneakersHome">Shop Now</ShopButton>
          </HeroTextBox>
        </EqualItem>

        <EqualItem>
          <HeroImage src={Heroboots} alt="Shop Casual Boots" />
          <HeroTextBox small>
            <HeroHeading small>Shop Casual Boots</HeroHeading>
            <HeroDescription small>Durable and Fashionable Boots for Every Step</HeroDescription>
            <ShopButton small href="/BootsHome">Shop Now</ShopButton>
          </HeroTextBox>
        </EqualItem>

        <EqualItem>
          <HeroImage src={Herowatch} alt="Shop Watches" />
          <HeroTextBox small>
            <HeroHeading small>Shop Watches</HeroHeading>
            <HeroDescription small>Timeless Elegance – Discover Our Watch Collection</HeroDescription>
            <ShopButton small href="/WatchesHome">Shop Now</ShopButton>
          </HeroTextBox>
        </EqualItem>
      </SneakersBootsWatchesRow>

      {/* Find My Outfit button */}
      <FindOutfitButton href="/ItemList">Find My Outfit</FindOutfitButton>
    </HeroContainer>
  );
};

export default HeroSection;
