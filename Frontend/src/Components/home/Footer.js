import React from "react";
import styled from "styled-components";
import logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>MENU</FooterTitle>
          <FooterLink href="/">HOME</FooterLink>
          <FooterLink href="/C_Home">CLOTHING</FooterLink>
          <FooterLink href="/Salonhome">SALON</FooterLink>
          <FooterLink href="/A_Home">ACCESSORIES</FooterLink>
          <FooterLink href="/Contact">HELP</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>SUPPORT</FooterTitle>
          <FooterLink href="/">CAREERS</FooterLink>
          <FooterLink href="/">FAQ</FooterLink>
          <FooterLink href="/ticket">SUBMIT A REQUEST</FooterLink>
          <FooterLink href="/">RETURNS & EXCHANGES</FooterLink>
          <FooterLink href="/">SHIPPING POLICY</FooterLink>
          <FooterLink href="/"></FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Join the Community!</FooterTitle>
          <FooterText>
            Drop your email address and join our community. No spam, just great
            deals and early updates on new collections.
          </FooterText>
          <FooterInput type="email" placeholder="Email address" />
          <SubscribeButton>Subscribe</SubscribeButton>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <SocialLinks>
          <SocialLink href="#">
            <i className="fa fa-instagram"></i>
          </SocialLink>
          <SocialLink href="#">
            <i className="fa fa-facebook"></i>
          </SocialLink>
          <SocialLink href="#">
            <i className="fa fa-twitter"></i>
          </SocialLink>
          <SocialLink href="#">
            <i className="fa fa-linkedin"></i>
          </SocialLink>
        </SocialLinks>
        <FooterCopyright>
          Copyright © 2024, FashionHub. <br /> Designed & Developed by{" "}
          <strong>B309</strong>
        </FooterCopyright>
        <PaymentMethods>
          <StyledLogo src={logo} alt="Logo" />
        </PaymentMethods>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 40px 20px;
  font-family: "Roboto", sans-serif;

  @media (max-width: 768px) {
    padding: 20px 10px; // Reduced padding for mobile
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: row; // Changed from column to row for mobile view
    align-items: flex-start; // Aligning to the start for better distribution
    text-align: left; // Align text to the left
    gap: 15px; // Reduced gap between columns
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  margin-bottom: 15px;
  color: #8b0000;
  font-family: "Poppins", sans-serif;
  font-size: 1.2em; // Adjusted font size

  @media (max-width: 768px) {
    font-size: 1em; // Smaller font size for mobile
    margin-bottom: 10px; // Reduced margin
  }
`;

const FooterLink = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  font-family: "Lato", sans-serif;

  &:hover {
    color: #8b0000;
  }

  @media (max-width: 768px) {
    font-size: 0.9em; // Adjusted font size for mobile
  }
`;

const FooterText = styled.p`
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
  font-size: 1em; // Adjusted font size for mobile

  @media (max-width: 768px) {
    font-size: 0.9em; // Smaller font size for mobile
    margin-bottom: 10px; // Reduced margin
  }
`;

const FooterInput = styled.input`
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  font-family: "Lato", sans-serif;

  @media (max-width: 768px) {
    width: 80%; // Adjusted width for mobile
  }
`;

const SubscribeButton = styled.button`
  padding: 8px 15px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #ae2012;
  }

  @media (max-width: 768px) {
    padding: 6px 12px; // Smaller button for mobile
  }
`;

const FooterBottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px; // Adjusted gap for mobile
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 24px;
  text-decoration: none;

  &:hover {
    color: #ae2012;
  }

  @media (max-width: 768px) {
    font-size: 20px; // Smaller icons for mobile
  }
`;

const FooterCopyright = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9em; // Smaller text for mobile
`;

const PaymentMethods = styled.div`
  img {
    margin-right: 10px;
    height: 60px; // Adjusted image height for mobile
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
`;

const StyledLogo = styled.img`
  height: 90px;
  margin-right: 10px;

  @media (max-width: 768px) {
    height: 60px; // Smaller logo for mobile
  }
`;
