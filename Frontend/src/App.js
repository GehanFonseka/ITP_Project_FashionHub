import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';

import Footer from './Components/home/Footer';
import ReviewForm from './Components/Review/ReviewForm';
import MyReviews from './Components/Review/MyReviews';
import ReviewDisplay from './Components/Review/ReviewDisplay';
import DashboardContainer from './Components/ReviewAdmin/DashboardContainer';
import Salonhome from './Components/salon/salonhome';


function App() {
  return (
    <Router>
    
      <Header />
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/ReviewForm" element={<ReviewForm/>} />
      <Route path="/ReviewDisplay" element={<ReviewDisplay/>} />
      <Route path="/salonhome" element={<Salonhome/>} />
      <Route path="/MyReviews" element={<MyReviews/>} />
      <Route path="/DashboardContainer" element={<DashboardContainer/>} />
    
      
      </Routes>
      <Footer />
    </Router>
   
  );
 
}

export default App;
