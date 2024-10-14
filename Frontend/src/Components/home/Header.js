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

// Styled Components
const Nav = styled.nav`
  display: flex;
  align-items: center; /* Vertically center all items */
  justify-content: space-between; /* Ensure spacing between sections */
  padding: 8px 20px; /* Reduced padding to make the navbar shorter */
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 55px; /* Slightly reduced logo height */
`;

const Menu = styled.div`
  display: flex;
  gap: 40px;
  align-items: center; /* Vertically center menu items */
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px; /* Slightly reduced font size */
  font-weight: bold;

  &:hover {
    color: #AE2012;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  margin-top: 15px; /* Adjust margin-top to align with smaller navbar */
`;

const SearchInput = styled.input`
  padding: 8px 10px; /* Slightly reduced padding */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 200px;
  outline: none;

  &:focus {
    border-color: #AE2012;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* Slightly reduced gap */
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 22px; /* Slightly reduced icon size */
  text-decoration: none;

  &:hover {
    color: #8b0000;
  }
`;
