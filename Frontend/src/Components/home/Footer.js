import React, { useState } from "react";
import styled from 'styled-components';
import logo from '../../assets/Logo.png'; 

const Footer = () => {
  return (
    
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>MENU</FooterTitle>
          <FooterLink href="#">HOME</FooterLink>
          <FooterLink href="#">CLOTHING</FooterLink>
          <FooterLink href="#">SALOON</FooterLink>
          <FooterLink href="/DashboardContainer">ACCESSORIES</FooterLink>
          <FooterLink href="/Overview">HELP</FooterLink>

        </FooterColumn>

        <FooterColumn>
          <FooterTitle>SUPPORT</FooterTitle>

          <FooterLink href="C_AdminDB01">CAREERS</FooterLink>

          <FooterLink href="F_AdminDB01">FAQ</FooterLink>
          <FooterLink href="/ReviewDisplay">SUBMIT A REQUEST</FooterLink>
          <FooterLink href="/MyReviews">RETURNS & EXCHANGES</FooterLink>
          <FooterLink href="/DashboardContainer">SHIPPING POLICY</FooterLink>
          <FooterLink href="/Response/">CONTACT US</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Join the Community!</FooterTitle>
          <FooterText>
            Hey! Drop your E-mail address and join the Community. We don't spam. Just sick Deals and Early updates on new collections.
          </FooterText>
          <FooterInput type="email" placeholder="Email address" />
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <SocialLink href="#">
          <i className="fa fa-instagram"></i>
        </SocialLink>
        <FooterCopyright>
          Copyright © 2024, FashionHub. <br /> Designed & Developed by <strong>B309</strong>
        </FooterCopyright>
        <PaymentMethods>
          <StyledLogo src={logo} alt="Logo" />
        </PaymentMethods>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 40px 20px;
  fixed;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
`;

const FooterTitle = styled.h3`
  margin-bottom: 15px;
  color:#8b0000;
`;

const FooterLink = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    color: #8b0000;
  }
`;

const FooterText = styled.p`
  margin-bottom: 2
  
  
  0px;
`;

const FooterInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
`;

const FooterBottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 24px;
  text-decoration: none;

  &:hover {
    color: #AE2012;
  }
`;

const FooterCopyright = styled.p`
  margin-bottom: 10px;
  text-align: center;
  margin-left: 100px; /* Adjust as needed to balance the spacing */
  margin-top: 20px; /* Adjust to position it slightly lower */
`;

const PaymentMethods = styled.div`
  img {
    margin-right: 10px;
    height: 80px;
  }
`;

const StyledLogo = styled.img`
  height: 90px; /* Adjust the size as needed */
  margin-right: 10px; /* Add spacing between logos if there are multiple */
`;