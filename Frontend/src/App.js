import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';
import Main from './Components/Help/Main';
import Request from './Components/Help/Request';
import Faqs from './Components/Help/Faqs';
import Shipping from './Components/Help/Shipping';
import Refund from './Components/Help/Refund';
import Footer from './Components/home/Footer';
import Chat from './Components/Help/Chat';
import Chat1 from './Components/Help/Chat1';




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/help" element={<Main />} />
        <Route path="/request" element={<Request />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/shipping" element={<Shipping />} /> 
        <Route path="/Chat" element={<Chat/>} /> 
        <Route path="/refund" element={<Refund/>} />
        <Route path="/Chat1" element={<Chat1/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
