// Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <SidebarItem href="/ServiceList">Services</SidebarItem>
        <SidebarItem href="/AppointmentForm">Book Now</SidebarItem>
        <SidebarItem href="/MyAppointmentForm">My Appointments</SidebarItem>

      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div`
  height: 100vh;
  width: ${(props) => (props.isOpen ? "203px" : "0")};
  position: fixed;
  top: 80px;
  left: 0;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 900;
  font-family: 'Roboto', sans-serif; /* Set font for the sidebar */
`;

const SidebarItem = styled.a`
  padding: 15px 20px;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif; /* Set font for sidebar items */

  &:hover {
    color: #ae2012;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 125px;
  left: ${(props) => (props.isOpen ? "210px" : "29px")};
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000;
  transition: left 0.3s ease;
  font-family: 'Lato', sans-serif; /* Set font for toggle button */

  &:hover {
    background-color: #ae2012;
  }
`;


export default Sidebar;
