import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import headerImage from "../../assets/headerImage1.jpg"; // Replace with the actual path to your image
import hairStylingImage from "../../assets/Hair.jpg"; // Add paths for the service images
import nailCareImage from "../../assets/Nails.jpg";
import massageImage from "../../assets/Massage.jpg";
import facialImage from "../../assets/Facial.jpg";
import makeUpImage from "../../assets/MakeUp.jpg";
import bodyTreatmentImage from "../../assets/BodyThreatment.jpg";



// Main Salon Home Component
const Salonhome = () => {
  return (
    <MainContainer>
      
      <Content>
        <HeaderText>
          <Heading>The Pinnacle of Beauty and Luxury</Heading>
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
          <ServiceItem>
            <ServiceImage src={hairStylingImage} alt="Hair Styling" />
            <ServiceLabel>Hair Styling</ServiceLabel>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={nailCareImage} alt="Nail Care" />
            <ServiceLabel>Nail Care</ServiceLabel>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={massageImage} alt="Massages" />
            <ServiceLabel>Massages</ServiceLabel>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={facialImage} alt="Facial" />
            <ServiceLabel>Facial</ServiceLabel>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={makeUpImage} alt="MakeUp" />
            <ServiceLabel>MakeUp</ServiceLabel>
          </ServiceItem>
          <ServiceItem>
            <ServiceImage src={bodyTreatmentImage} alt="Body Treatment" />
            <ServiceLabel>Body Treatment</ServiceLabel>
          </ServiceItem>
        </ServicesContainer>

        <ButtonContainer>
          <ActionButton href="/ServiceList">Service List</ActionButton>
          <ActionButton href="/AppointmentForm">Book Now</ActionButton>
        </ButtonContainer>
      </Content>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
`;

const HeaderText = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  width: 102%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 500px;
  position: relative;
  left: -5%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const LeftText = styled.p`
  font-size: 1.2rem;
  flex: 1;
  margin-right: 10px;
  line-height: 1.6;
  text-align: center;
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
  padding-left: 10px;
`;

const ServiceItem = styled.div`
  flex: 1;
  min-width: 150px;
  text-align: center;
  margin: 10px;
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
  padding: 10px 20px;
  margin: 0 10px;
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

export default Salonhome;
