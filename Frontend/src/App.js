import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';

import Salonhome from './Components/salon/Salonhome';
import Footer from './Components/home/Footer';


function App() {
  return (
    <Router>
    
      <Header />
    
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/salon" element={<Salonhome/>} />
      
      </Routes>
   <Footer />
    </Router>
   
  );
 
}

export default App;
