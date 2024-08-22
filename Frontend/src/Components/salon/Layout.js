import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../home/Header'; // Adjust path according to your structure
import Footer from '../home/Footer'; // Adjust path according to your structure
import Sidebar from './Sidebar'; // Correct path to Sidebar

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = ['/salon', '/ServiceList', '/AppointmentForm', '/MyAppointmentForm'].includes(location.pathname);

  return (
    <>
      <Header />
      {showSidebar && <Sidebar />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
