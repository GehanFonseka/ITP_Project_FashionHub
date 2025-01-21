import React from "react";
import styled from 'styled-components';
import menImage from '../../assets/menImage.jpg'; // Images for the new sections
import womenImage from '../../assets/womenImage.jpg';
import salon111 from '../../assets/salonhome.webp';
import salon from '../../assets/salon1.jpg';
import Heroboots from '../../assets/Heroboots.jpg';
import Herosneakers from '../../assets/Herosneakers.jpg';
import Herowatch from '../../assets/Herowatch.jpg';
import HeroFind from '../../assets/HeroFind.jpg';


// Styled Components
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 60px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const HeroRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const HeroItem = styled.div`
  position: relative;
  width: ${(props) => (props.wide ? '100%' : '48%')};
  height: 350px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(70%);

  @media (max-width: 768px) {
    height: 350px;  /* Add this line to enforce consistent image size on mobile */
  }
`;


const HeroTextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
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
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeroDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ShopButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  text-align: center;
  padding: 10px 20px;
  background-color: #8b0000;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 15px;
  }
`;

const FindOutfitButton = styled.a`
  padding: 15px 30px;
  background-color: #8b0000;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 30px;

  &::before {
    content: '🎯';
    margin-right: 10px;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #006666;
  }
`;

// New styled components for About Us and Review sections
const AboutUsSection = styled.section`
  padding: 60px;
  background-color: #f0f0f0;
  text-align: center;
`;

const AboutHeading = styled.h2`
  font-size: 32px;
  color: #333;
`;

const AboutDescription = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const ReviewSection = styled.section`
  padding: 60px;
  background-color: #ffffff;
  text-align: center;
`;

const ReviewHeading = styled.h2`
  font-size: 32px;
  color: #333;
`;

const ReviewList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ReviewItem = styled.div`
  width: 30%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #666;
`;

const ReviewAuthor = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const HeroSection = () => {
  return (
    <>
      <HeroContainer>
        <HeroRow>
          <HeroItem>
            <HeroImage src={menImage} alt="Shop Men's Clothing" />
            <HeroTextBox>
              <HeroHeading>Shop Men's Clothing</HeroHeading>
              <p>Unleash Your Inner Fashion Icon – Explore Men's Wear</p>
              <ShopButton href="/C_MensCasualAndFormal">Shop Now</ShopButton>
            </HeroTextBox>
          </HeroItem>

          <HeroItem>
            <HeroImage src={womenImage} alt="Shop Women's Clothing" />
            <HeroTextBox>
              <HeroHeading>Shop Women's Clothing</HeroHeading>
              <p>Revamp Your Wardrobe – Shop the Latest Women’s Fashion</p>
              <ShopButton href="/C_WomensCasualAndFormal">Shop Now</ShopButton>
            </HeroTextBox>
          </HeroItem>
        </HeroRow>

        <HeroRow>
          <HeroItem>
            <HeroImage src={salon111} alt="Unisex Salon" />
            <HeroTextBox wide>
              <HeroHeading>Ladies Salon</HeroHeading>
              <p>Luxury beauty services in a serene setting.</p>
              <ShopButton href="/SalonHome">Book Now</ShopButton>
            </HeroTextBox>
          </HeroItem>
        

        
          <HeroItem>
            <HeroImage src={Herosneakers} alt="Shop Casual Sneakers" />
            <HeroTextBox>
              <HeroHeading>Shop Casual Sneakers</HeroHeading>
              <HeroDescription>Step into Comfort – Trendy Sneakers for Every Occasion</HeroDescription>
              <ShopButton href="/F_Home">Shop Now</ShopButton>
            </HeroTextBox>
          </HeroItem>
          </HeroRow>
       
          <HeroRow>
          <HeroItem>
            <HeroImage src={HeroFind} alt="Find My Outfit" />
            <HeroTextBox>
              <HeroHeading>Find My Outfit</HeroHeading>
              <HeroDescription>Explore styles tailored to your taste</HeroDescription>
              <ShopButton href="/ItemList">Find My Outfit</ShopButton>
            </HeroTextBox>
          </HeroItem>

          <HeroItem>
            <HeroImage src={Herowatch} alt="Shop Watches" />
            <HeroTextBox>
              <HeroHeading>Shop Watches</HeroHeading>
              <HeroDescription>Timeless Elegance – Discover Our Watch Collection</HeroDescription>
              <ShopButton href="/A_Home">Shop Now</ShopButton>
            </HeroTextBox>
          </HeroItem>
        </HeroRow>

        <FindOutfitButton href="/ItemList">Find Your Perfect Outfit</FindOutfitButton>
  
      </HeroContainer>

      {/* About Us Section */}
      <AboutUsSection>
        <AboutHeading>About Us</AboutHeading>
        <AboutDescription>
          We are a fashion and lifestyle destination committed to offering the best in men's and women's clothing, accessories, and beauty services. Our goal is to inspire you to find your perfect style, whether you're looking for casual wear, formal attire, or a pampering experience at our luxury salon.
        </AboutDescription>
      </AboutUsSection>

      {/* Review Section */}
      <ReviewSection>
        <ReviewHeading>What Our Customers Say</ReviewHeading>
        <ReviewList>
          <ReviewItem>
            <ReviewText>"The shopping experience was amazing! The collection is trendy, and I found everything I was looking for!"</ReviewText>
            <ReviewAuthor>- Jane Doe</ReviewAuthor>
          </ReviewItem>

          <ReviewItem>
            <ReviewText>"I absolutely love my new sneakers! Comfortable and stylish, and the delivery was super fast!"</ReviewText>
            <ReviewAuthor>- John Smith</ReviewAuthor>
          </ReviewItem>

          <ReviewItem>
            <ReviewText>"The salon service was fantastic. I felt so pampered, and the staff was incredibly professional!"</ReviewText>
            <ReviewAuthor>- Emily Johnson</ReviewAuthor>
          </ReviewItem>
        </ReviewList>
      </ReviewSection>
    </>
  );
};

export default HeroSection;
