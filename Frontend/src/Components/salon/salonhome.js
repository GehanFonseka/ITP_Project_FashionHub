import React, { useState } from "react";
import styled from "styled-components";
import headerImage from "../../assets/headerImage1.jpg"; // Replace with the actual path to your image
import hairStylingImage from "../../assets/Hair.jpg";
import nailCareImage from "../../assets/Nails.jpg";
import massageImage from "../../assets/Massage.jpg";
import facialImage from "../../assets/Facial.jpg";
import makeUpImage from "../../assets/MakeUp.jpg";
import bodyTreatmentImage from "../../assets/BodyThreatment.jpg";
import ReviewDisplay from '../Review/ReviewDisplay';

// Mock service data with IDs
const services = [
  { id: 1, name: "Hair Styling", image: hairStylingImage },
  { id: 2, name: "Nail Care", image: nailCareImage },
  { id: 3, name: "Massages", image: massageImage },
  { id: 4, name: "Facial", image: facialImage },
  { id: 5, name: "MakeUp", image: makeUpImage },
  
];

// Main Salon Home Component
const Salonhome = () => {
  let storeId = 'S002';
  const [selectedService, setSelectedService] = useState(null);

  return (
    <MainContainer>
      <Content>
        <HeaderText>
          <Heading>The Pinnacle of Beauty and Luxury for Women</Heading>
        </HeaderText>
        <ImageContainer>
          <StyledImage src={headerImage} alt="Liyo Salon" />
        </ImageContainer>
        <DescriptionContainer>
          <LeftText>
            Our salon is your sanctuary—a place where you can escape the everyday and indulge in a world of luxury. From our soothing body treatments to our rejuvenating facial services, we offer a full spectrum of beauty care designed to help you look and feel your best. Trust our experienced team to pamper you with personalized attention and top-quality products that deliver stunning results.
          </LeftText>
        </DescriptionContainer>

        <OurServicesContainer>
          <OurServicesHeading>Our Services</OurServicesHeading>
          <OurServicesDescription>
            At FashionHub Salon, we provide a variety of top-notch services to cater to all your beauty needs. Whether it's a stylish haircut, a relaxing spa treatment, or a rejuvenating facial, our expert team is dedicated to delivering an exceptional experience. Our services include:
          </OurServicesDescription>
        </OurServicesContainer>

        <ServicesContainer>
          {services.map((service) => (
            <ServiceItem key={service.id}>
              <ServiceImage src={service.image} alt={service.name} />
              <ServiceLabel>{service.name}</ServiceLabel>
            </ServiceItem>
          ))}
        </ServicesContainer>

        <ButtonContainer>
          <ActionButton href="/ServiceList">Service List</ActionButton>
          <ActionButton href="/AppointmentForm">Book Now</ActionButton>
        </ButtonContainer>

        <ReviewSection>
          <ReviewHeading>Customer Reviews: Where Style Meets Satisfaction</ReviewHeading>
          <ReviewDescription>
            Our passion is fashion, but our pride is in your satisfaction. Your review is a reflection of our commitment to excellence.
          </ReviewDescription>
          <ReviewButton href={`/ReviewForm/${storeId}`}>Write a Review</ReviewButton>
        </ReviewSection>

        {/* Display the ReviewDisplay component */}
        <ReviewDisplay storeID={storeId} />
      </Content>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  background-color: #f9f9f9; /* Light background for better contrast */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  padding: 40px; /* Increased padding for spacious feel */
`;

const HeaderText = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #ae2012; /* Accent color for the heading */
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 90%; /* Set the desired width percentage */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Ensures the image behaves like a block element */
  margin: 0 auto; /* Center the image */
  max-height: 500px; /* Optional: limit the height to maintain design */
  border-radius: 15px; /* Rounded corners for a softer look */
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 40px;
  background-color: #fff; /* White background for text area */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
`;

const LeftText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify; /* Justified text for a neat look */
`;

const OurServicesContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const OurServicesHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const OurServicesDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const ServicesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ServiceItem = styled.div`
  flex: 1;
  min-width: 220px; /* Increased minimum width for better layout */
  text-align: center;
  margin: 20px; /* Adjusted margin for spacing */
  background-color: #fff; /* Background for service item */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow effect */
  transition: transform 0.2s ease; /* Smooth hover effect */
  
  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ServiceLabel = styled.h3`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ActionButton = styled.a`
  background-color: #ae2012;
  color: #fff;
  padding: 10px 15px; /* Increased padding for a button */
  margin: 0 15px; /* Adjusted margin for buttons */
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

const ReviewSection = styled.div`
  margin-top: 60px;
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 10px; /* Rounded corners */
`;

const ReviewHeading = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const ReviewDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
`;

const ReviewButton = styled.a`
  display: inline-block;
  padding: 15px 30px; /* Increased padding for the button */
  background-color: #E76F51;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

export default Salonhome;
