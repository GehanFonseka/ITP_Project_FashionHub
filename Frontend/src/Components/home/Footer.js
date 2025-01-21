import React from "react";
import styled from "styled-components";
import logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>MENU</FooterTitle>
          <FooterLink href="#">HOME</FooterLink>
          <FooterLink href="#">CLOTHING</FooterLink>
          <FooterLink href="#">SALON</FooterLink>
          <FooterLink href="/DashboardContainer">ACCESSORIES</FooterLink>
          <FooterLink href="/Overview">HELP</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>SUPPORT</FooterTitle>
          <FooterLink href="C_AdminDB01">CAREERS</FooterLink>
          <FooterLink href="/F_AdminDB01">FAQ</FooterLink>
          <FooterLink href="/ReviewDisplay">SUBMIT A REQUEST</FooterLink>
          <FooterLink href="/MyReviews">RETURNS & EXCHANGES</FooterLink>
          <FooterLink href="/DashboardContainer">SHIPPING POLICY</FooterLink>
          <FooterLink href="/Response/">CONTACT US</FooterLink>
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
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
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
`;

const FooterText = styled.p`
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
`;

const FooterInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  font-family: "Lato", sans-serif;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SubscribeButton = styled.button`
  padding: 10px 20px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #ae2012;
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
`;

const FooterCopyright = styled.p`
  font-family: "Roboto", sans-serif;
`;

const PaymentMethods = styled.div`
  img {
    margin-right: 10px;
    height: 80px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const StyledLogo = styled.img`
  height: 90px;
  margin-right: 10px;
`;
