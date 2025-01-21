import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo6.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes("clothing")) {
      navigate("/C_Home");
    } else if (query.includes("salon")) {
      navigate("/Salonhome");
    } else if (query.includes("footwear")) {
      navigate("/F_Home");
    } else if (query.includes("accessories")) {
      navigate("/A_Home");
    } else {
      alert(
        "Section not found! Please try searching for Clothing, Salon, Footwear, or Accessories."
      );
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Nav>
        <Logo src={logo} alt="Logo" />
        <MenuIcon onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </MenuIcon>
        <DesktopMenu>
          <MenuItem href="/">Home</MenuItem>
          <MenuItem href="/C_Home">Clothing</MenuItem>
          <MenuItem href="/Salonhome">Salon</MenuItem>
          <MenuItem href="/F_Home">Footwear</MenuItem>
          <MenuItem href="/A_Home">Accessories</MenuItem>
          <MenuItem href="/Contact">Help</MenuItem>
          <MenuItem href="/Register">Register</MenuItem>
        </DesktopMenu>
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Sidebar */}
      <Sidebar open={sidebarOpen}>
        <CloseIcon onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>
        <SidebarMenu>
          <SidebarItem href="/" onClick={closeSidebar}>
            Home
          </SidebarItem>
          <SidebarItem href="/C_Home" onClick={closeSidebar}>
            Clothing
          </SidebarItem>
          <SidebarItem href="/Salonhome" onClick={closeSidebar}>
            Salon
          </SidebarItem>
          <SidebarItem href="/F_Home" onClick={closeSidebar}>
            Footwear
          </SidebarItem>
          <SidebarItem href="/A_Home" onClick={closeSidebar}>
            Accessories
          </SidebarItem>
          <SidebarItem href="/Contact" onClick={closeSidebar}>
            Help
          </SidebarItem>
          <SidebarItem href="/Register" onClick={closeSidebar}>
            Register
          </SidebarItem>
        </SidebarMenu>
      </Sidebar>
    </>
  );
};

export default Header;

// Styled Components
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: 55px;
`;

const MenuIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 26px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    color: #ae2012;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 200px;
  outline: none;
  margin-top:15px;

  &:focus {
    border-color: #ae2012;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 22px;
  text-decoration: none;

  &:hover {
    color: #8b0000;
  }
`;

// Sidebar Styles
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-100%")};
  width: 250px;
  height: 100%;
  background-color: #000;
  color: #fff;
  transition: left 0.3s ease-in-out;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CloseIcon = styled.div`
  align-self: flex-end;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const SidebarItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    color: #ae2012;
  }
`;
