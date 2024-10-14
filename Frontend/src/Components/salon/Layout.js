import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../home/Header'; 
import Footer from '../home/Footer'; 
import Sidebar from './Sidebar';

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
