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
  align-items: center; /* Center the items vertically */
  padding: 15px 25px;
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 30px; /* Add some space between logo and menu */
`;

const Menu = styled.div`
  display: flex;
  gap: 25px;
  flex-grow: 1; /* Allow the menu to grow and take up available space */
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
  display: flex;
  align-items: center; /* Center the search input vertically */
  justify-content: center; /* Center the search input horizontally */
  margin: 0 10px; /* Horizontal margin for spacing */
  height: 50%; /* Fill the header height */
  position: relative; /* Ensure it positions relative to the header */
  top: 8px; /* Move down without changing the header size */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
`;

const SearchInput = styled.input`
  padding: 12px 15px; /* Increased padding for a comfortable input size */
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 30px; /* More rounded corners for a modern look */
  font-size: 16px;
  width: 200px; /* Adjust width as needed */
  outline: none; /* Remove outline */
  transition: width 0.4s ease, border-color 0.3s ease; /* Smooth transitions */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  background-color: #fff; /* White background for the input */
  
  /* Placeholder styling */
  &::placeholder {
    color: #aaa; /* Placeholder color */
    opacity: 0.7; /* Slightly transparent for a modern look */
  }

  /* Focus styles */
  &:focus {
    width: 250px; /* Expand width on focus */
    border-color: #AE2012; /* Change border color on focus */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Deeper shadow on focus */
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 35px;
  margin-left: 50px; /* Adjusted margin for better alignment */
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: #8b0000;
  }
`;
