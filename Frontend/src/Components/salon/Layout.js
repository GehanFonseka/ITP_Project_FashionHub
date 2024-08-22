import React from "react";
import styled from "styled-components";
import Sidebar from "./Components/salon/Sidebar"; // Adjust the import path as necessary

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  margin-left: 200px; /* Adjust this value based on your sidebar width */
  width: calc(100% - 200px);
  padding: 20px;
`;
