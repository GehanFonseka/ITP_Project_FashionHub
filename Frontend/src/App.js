import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';

import HeroSection from './Components/home/HeroSection';

import Dailysales1 from './Components/Finance/Dailysales1';
import Dashboard from './Components/Finance/Dashboard';
import MonthlySales from './Components/Finance/MonthlySales';
import WeeklySales from './Components/Finance/WeeklySales';
import Customers from './Components/Finance/Customers';
import Transactions from './Components/Finance/Transactions';
import BreakDown from './Components/Finance/BreakDown';
import Salaries from './Components/Finance/Salaries';

import Footer from './Components/home/Footer';





function App() {
  return (
    <Router>
    
      <Header />
      
     
      <Routes>
      
      <Route path="/HeroSection" element={<HeroSection/>} />
      <Route path="/Dailysales1" element={<Dailysales1 />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/MonthlySales" element={<MonthlySales />} />
      <Route path="/WeeklySales" element={<WeeklySales />} />
      <Route path="/Customers" element={<Customers/>} />
      <Route path="/Transactions" element={<Transactions />} />
      <Route path="/BreakDown" element={<BreakDown/>} />
      <Route path="/Salaries" element={<Salaries/>} />



     
      
      </Routes>
     <Footer />
    </Router>
   
  );
 
}

export default App;
