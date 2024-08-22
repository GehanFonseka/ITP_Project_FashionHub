import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';
import AppointmentForm from './Components/salon/AppointmentForm';

import Salonhome from './Components/salon/Salonhome';
import ServiceList from './Components/salon/ServiceList';
import MyAppointmentForm from './Components/salon/MyAppointmentForm';
import Footer from './Components/home/Footer';



function App() {
  return (
    <Router>
    
      <Header />
    
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/salon" element={<Salonhome/>} />
      <Route path="/ServiceList" element={<ServiceList />} />
      <Route path="/AppointmentForm" element={<AppointmentForm />} />
      <Route path="/MyAppointmentForm" element={<MyAppointmentForm />} />
      
      </Routes>
   <Footer />
    </Router>
   
  );
 
}

export default App;
