import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import logo from '../../assets/Logo6.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (event) => {
    event.preventDefault();

    // Convert search query to lowercase to handle case-insensitive search
    const query = searchQuery.toLowerCase();

    // Check for different search terms and navigate accordingly
    if (query.includes("clothing")) {
      navigate("/C_Home");
    } else if (query.includes("salon")) {
      navigate("/Salonhome");
    } else if (query.includes("footwear")) {
      navigate("/F_Home");
    } else if (query.includes("accessories")) {
      navigate("/A_Home");
    } else {
      alert("Section not found! Please try searching for Clothing, Salon, Footwear, or Accessories.");
    }
  };

  return (
    <Nav>
      <Logo src={logo} alt="Logo" />
      <Menu>
        <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/C_Home">Clothing</MenuItem>
        <MenuItem href="/Salonhome">Salon</MenuItem>
        <MenuItem href="/F_Home">Footwear</MenuItem>
        <MenuItem href="/A_Home">Accessories</MenuItem>
        <MenuItem href="/Contact">Help</MenuItem>
        <MenuItem href="/Register">Register</MenuItem>
      </Menu>
      <SearchContainer>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search input state
          />
        </form>
      </SearchContainer>
      <IconContainer>
        <IconLink href="/Cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </IconLink>
        <IconLink href="/userDashboard">
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
  z-index: 1000;
`;

const Logo = styled.img`

height: 50px;

`;

const Menu = styled.div`
  display: flex;
  gap: 25px;
  padding-top:23px;
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    color: #AE2012;
  }
`;

const SearchContainer = styled.div`
  margin-left: 260px; /* Adjust this to position the search bar */
  margin-top: 15px; /* Adjusted margin to align search bar */
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
  padding-top: 23px; /* Adjusted padding to align icons */
  gap: 35px; /* Adjusted gap between icons */
  margin-left: 55px; /* Adjust this value as needed */
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: #8b0000;
  }
`;
