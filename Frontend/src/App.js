import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';
import AppointmentForm from './Components/salon/AppointmentForm';
import Footer from './Components/home/Footer';

function App() {
  return (
    <Router>
    
      <Header />
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/salon" element={<AppointmentForm />} />
      
      </Routes>
      <Footer />
    </Router>
    
  );
 
}

export default App;
