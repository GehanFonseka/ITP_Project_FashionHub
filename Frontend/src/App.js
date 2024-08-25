import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';

import F_Home from './Components/Footwear & Accessories/F_Home';
import F_MensCasualAndFormal from './Components/Footwear & Accessories/F_Men\'sCasualAndFormal';
import F_WomensCasualAndFormal from './Components/Footwear & Accessories/F_Women\'sCasualAndFormal';
import A_Home from './Components/Footwear & Accessories/A_Home';



import Footer from './Components/home/Footer';


function App() {
  return (
    <Router>
    
      <Header />
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/F_Home" element={<F_Home/>} />
      <Route path="/F_MensCasualAndFormal" element={<F_MensCasualAndFormal/>} />
      <Route path="F_WomensCasualAndFormal" element={<F_WomensCasualAndFormal/>} />
      <Route path="/A_Home" element={<A_Home/>} />



      </Routes>
   <Footer />
    </Router>
   
  );
 
}

export default App;
