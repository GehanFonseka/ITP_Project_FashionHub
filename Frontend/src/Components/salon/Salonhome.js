import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import headerImage from "../../assets/headerImage1.jpg"; // Replace with the actual path to your image

// Sidebar Component
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <SidebarItem href="/">Services</SidebarItem>
        <SidebarItem href="/clothing">Book Now</SidebarItem>
        <SidebarItem href="/salon">My Appointments</SidebarItem>
        <SidebarItem href="/help">Help</SidebarItem>
      </SidebarContainer>
    </>
  );
};

// Main Salon Home Component
const SalonHome = () => {
  return (
    <MainContainer>
      <Sidebar />
      <Content>
        <Heading>Welcome to Sassoon Salon</Heading>
        <SubHeading>Your style, our passion.</SubHeading>
        <BannerButton href="#">Find Your Nearest Salon</BannerButton>
      </Content>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  height: 100vh;
  background-image: url(${headerImage}); /* Background Image */
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
`;

const Heading = styled.h1`
  font-size: 3rem; /* Adjust font size as needed */
  margin-bottom: 20px;
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const BannerButton = styled.a`
  display: inline-block;
  padding: 10px 30px;
  background-color: #ae2012;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #c71f16; /* Slightly lighter red on hover */
  }
`;

const SidebarContainer = styled.div`
  height: 100vh;
  width: ${(props) => (props.isOpen ? "200px" : "0")};
  position: fixed;
  top: 80px; /* Adjust based on your header height */
  left: 0;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 900; /* Ensure it stays below the header */
`;

const SidebarItem = styled.a`
  padding: 15px 20px;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;

  &:hover {
    color: #ae2012;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 125px; /* Slightly below the header */
  left: ${(props) => (props.isOpen ? "210px" : "29px")};
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000; /* Ensure the button stays on top */
  transition: left 0.3s ease;

  &:hover {
    background-color: #ae2012;
  }
`;

export default SalonHome;
