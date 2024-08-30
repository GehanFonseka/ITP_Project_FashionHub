import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';

import Footer from './Components/home/Footer';
import ReviewForm from './Components/Review/ReviewForm';
import ReviewDisplay from './Components/Review/ReviewDisplay';


function App() {
  return (
    <Router>
    
      <Header />
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/help" element={<ReviewForm/>} />
      <Route path="/ReviewDisplay" element={<ReviewDisplay/>} />
    
      
      </Routes>
      <Footer />
    </Router>
   
  );
 
}

export default App;
