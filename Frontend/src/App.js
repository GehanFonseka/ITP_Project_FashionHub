import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Components/home/Header'; 
import HeroSection from './Components/home/HeroSection';
import Footer from './Components/home/Footer';
import Register from './Components/Login1/Register';
import Login from './Components/Login1/Login';
import Cart from './Components/salon/Cart';
import { CartProvider } from './Components/salon/CartContext'; 

// Import all components
import F_Home from './Components/Footwear & Accessories/F_Home';
import F_MensCasualAndFormal from './Components/Footwear & Accessories/F_Men\'sCasualAndFormal';
import F_WomensCasualAndFormal from './Components/Footwear & Accessories/F_Women\'sCasualAndFormal';
import A_Home from './Components/Footwear & Accessories/A_Home';

import Sidebar from './Components/salon/Sidebar';
import AppointmentForm from './Components/salon/AppointmentForm';
import Salonhome from './Components/salon/Salonhome';
import MyAppointmentForm from './Components/salon/MyAppointmentForm';
import Dashboard from './Components/salon/Dashboard';
import ServiceList from './Components/SalonAD/ServiceList';
import ServiceListAD from './Components/SalonAD/ServiceListAD';

import AllAppointments from './Components/SalonAD/ALLAppointments';
import ServicePopularityReport from './Components/SalonAD/ServicePopularityReport';




// Custom component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/Dashboard', '/Register', '/Login','/BarChart']; // Add paths where you don't want Header and Footer
;


  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

<<<<<<< Updated upstream
  return (
    <div>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </div>
  );
};
=======








>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          
          <Route path="/salon" element={<><Sidebar /><Salonhome /></>} />
          <Route path="/AppointmentForm" element={<><Sidebar /><AppointmentForm /></>} />
          <Route path="/MyAppointmentForm" element={<><Sidebar /><MyAppointmentForm /></>} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          
        
          <Route path="/ServicePopularityReport" element={<ServicePopularityReport />} />
         


<<<<<<< Updated upstream
          <Route path="/ServiceList" element={<ServiceList />} />
          <Route path="/ServiceListAD" element={<ServiceListAD />} />
          <Route path="/AllAppointments" element={<AllAppointments />} />
          <Route path="/F_Home" element={<F_Home />} />
          <Route path="/F_MensCasualAndFormal" element={<F_MensCasualAndFormal />} />
          <Route path="/F_WomensCasualAndFormal" element={<F_WomensCasualAndFormal />} />
          <Route path="/A_Home" element={<A_Home />} />
        </Routes>
      </Layout>
=======
      <Route path="/" element={<HeroSection/>} />
      <Route path="/F_Home" element={<F_Home/>} />
      <Route path="/F_MensCasualAndFormal" element={<F_MensCasualAndFormal/>} />
      <Route path="F_WomensCasualAndFormal" element={<F_WomensCasualAndFormal/>} />
      <Route path="/A_Home" element={<A_Home/>} />




      





      

      

      </Routes>
      <Footer />
>>>>>>> Stashed changes
    </Router>
  );
}

export default App;

