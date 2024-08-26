import React from "react";
import styled from 'styled-components';
import logo from '../../assets/Logo6.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Nav>
      <Logo src={logo} alt="Logo" />
      <Menu>
        <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/clothing1">Clothing</MenuItem>
        <MenuItem href="/">Saloon</MenuItem>
        <MenuItem href="/footwear">Footwear</MenuItem>
        <MenuItem href="/Dashboard">Accessories</MenuItem>
        <MenuItem href="/ChatBot">Help</MenuItem>
      </Menu>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
      </SearchContainer>
      <IconContainer>
        <IconLink href="#">
          <FontAwesomeIcon icon={faShoppingCart} />
        </IconLink>
        <IconLink href="#">
          <FontAwesomeIcon icon={faUser} />
        </IconLink>
      </IconContainer>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  display: flex;
  padding: 15px 25px; /* Increased padding by 5px */
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Ensure the nav stays on top */
`;

const Logo = styled.img`
  height: 42px; /* Slightly increased logo height */
`;

const Menu = styled.div`
  margin-left: 50px;
  display: flex;
  gap: 25px;
  padding-top: 8px; /* Adjusted padding to align menu items */
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;

  &:hover {
    color: #AE2012; /* Optional: Add hover effect */
  }
`;

const SearchContainer = styled.div`
  margin-left: 510px; /* Adjust this to position the search bar */
  margin-top: 5px; /* Adjusted margin to align search bar */
`;

const SearchInput = styled.input`
  padding: 12px 14px; /* Slightly increased padding for input */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 150px; /* Adjusted width slightly */
  outline: none;

  &:focus {
    border-color: #AE2012; /* Change the border color when focused */
  }
`;

const IconContainer = styled.div`
  display: flex;
  padding-top: 8px; /* Adjusted padding to align icons */
  gap: 35px; /* Adjusted gap between icons */
  margin-left: 55px; /* Adjust this value as needed */
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: #8b0000; /* Optional: Add hover effect */
  }
`;