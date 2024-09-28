import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header'; 
import HeroSection from './Components/home/HeroSection';


import F_Home from './Components/Footwear & Accessories/F_Home';
import F_MensCasualAndFormal from './Components/Footwear & Accessories/F_Men\'sCasualAndFormal';
import F_WomensCasualAndFormal from './Components/Footwear & Accessories/F_Women\'sCasualAndFormal';
import A_Home from './Components/Accessories/A_Home';
import A_Mens from './Components/Accessories/A_Mens';
import A_Womens from './Components/Accessories/A_Women';
import F_MensCasual from './Components/Footwear & Accessories/F_MensCasual';
import F_MensFormal from './Components/Footwear & Accessories/F_MensFormal';
import F_WomensCasual from './Components/Footwear & Accessories/F_WomensCasual';
import F_WomensFormal from './Components/Footwear & Accessories/F_WomensFormal';
import F_MensCasualTypes from './Components/Footwear & Accessories/F_MensCasualTypes';
import F_AdminDB01 from './Components/Footwear & Accessories/F_adminDashboard';
import F_AdminDBSneakers from './Components/Footwear & Accessories/F_AdminDBSneakers';
import AdminDBSB from './Components/Footwear & Accessories/AdminDBSB';
import F_AdminDBSneakersTable from './Components/Footwear & Accessories/F_AdminDBSneakersTable';
import F_AdminDBUpdateSneakers from './Components/Footwear & Accessories/F_AdminDBUpdateSneakers';
import F_MensCasualSneakers from './Components/Footwear & Accessories/F_MensCasualSneakers';
import F_MensFormalOfficeShoes from './Components/Footwear & Accessories/F_MensFormalOfficeshoes';
import AdminSBMensOfficeShoes from './Components/Footwear & Accessories/AdminSBMensOfficeshoes';
import F_AdminDBUpdateOfficeShoes from './Components/Footwear & Accessories/F_AdminDBUpdateOfficeShoes';
import F_WomensCasualBoots from './Components/Footwear & Accessories/F_WomensCasualBoots';
import F_WomensCasualTypes from './Components/Footwear & Accessories/F_WomensCasualTypes';
import F_AdminDBUpdateBoots from './Components/Footwear & Accessories/F_AdminDBUpdateBoots';
import F_AdminDBBoots from './Components/Footwear & Accessories/F_AdminDBBoots';
import F_AdminDBBootsTable from './Components/Footwear & Accessories/F_AdminDBBootsTable';
import AdminSBWomensBoots from './Components/Footwear & Accessories/AdminSBWomensBoots';
import A_AdminDBCandB from './Components/Accessories/A_AdminDBCandB';
import A_AdminDBCandBTable from './Components/Accessories/A_AdminDBCandBTable';
import A_AdminDBUpdateCandB from './Components/Accessories/A_AdminDBUpdateCandB';
import A_AdminSBMenCandB from './Components/Accessories/A_AdminSBMenCandB';
import A_MensCandB from './Components/Accessories/A_MensCandB';

import FootwearReport from './Components/Footwear & Accessories/FootwearReport';

import F_adminDashboard from './Components/Footwear & Accessories/F_adminDashboard';


import F_ProductDetails from './Components/Footwear & Accessories/F_ProductDetails'

import F_AdminReport from './Components/Footwear & Accessories/F_AdminReport';

import F_adminDashboard from './Components/Footwear & Accessories/F_adminDashboard';

import A_ProductDetails from './Components/Accessories/A_ProductDetails';
import F_ProductDetails from './Components/Footwear & Accessories/F_ProductDetails'

import F_AdminReport from './Components/Footwear & Accessories/F_AdminReport';


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
      <Route path="/A_Mens" element={<A_Mens/>} />
      <Route path="/A_Womens" element={<A_Womens/>} />
      <Route path="/F_MensCasual" element={<F_MensCasual/>} />
      <Route path="/F_MensFormal" element={<F_MensFormal/>} />
      <Route path="/F_WomensCasual" element={<F_WomensCasual/>} />
      <Route path="/F_WomensFormal" element={<F_WomensFormal/>} />
      <Route path="/F_MensCasualTypes" element={<F_MensCasualTypes/>} />
      <Route path="/ShoesSize" element={<shoesSize/>} />
      <Route path="/F_AdminDB01" element={<F_AdminDB01/>} />
      <Route path="/F_AdminDBSneakers" element={<F_AdminDBSneakers/>} />
      <Route path="/AdminDBSB" element={<AdminDBSB/>} />
      <Route path="/F_AdminDBSneakersTable" element={<F_AdminDBSneakersTable/>} />
      <Route path="/F_AdminDBUpdateSneakers" element={<F_AdminDBUpdateSneakers/>} />
      <Route path="/F_MensCasualSneakers" element={<F_MensCasualSneakers/>} />
      <Route path="/F_MensFormalOfficeShoes" element={<F_MensFormalOfficeShoes/>} />
      <Route path="/AdminSBMensOfficeShoes" element={<AdminSBMensOfficeShoes/>} />
      <Route path="/F_AdminDBUpdateOfficeShoes" element={<F_AdminDBUpdateOfficeShoes/>} />
      <Route path="/F_WomensCasualBoots" element={<F_WomensCasualBoots/>} />
      <Route path="/F_WomensCasualTypes" element={<F_WomensCasualTypes/>} />
      <Route path="/F_AdminDBUpdateBoots" element={<F_AdminDBUpdateBoots/>} />
      <Route path="/F_AdminDBBoots" element={<F_AdminDBBoots/>} />
      <Route path="/F_AdminDBBootsTable" element={<F_AdminDBBootsTable/>} />
      <Route path="/AdminSBWomensBoots" element={<AdminSBWomensBoots/>} />
      <Route path="/A_AdminDBCandB" element={<A_AdminDBCandB/>} />
      <Route path="/A_AdminDBCandBTable" element={<A_AdminDBCandBTable/>} />
      <Route path="/A_AdminDBUpdateCandB" element={<A_AdminDBUpdateCandB/>} />
      <Route path="/A_AdminSBMenCandB" element={<A_AdminSBMenCandB/>} />
      <Route path="/A_MensCandB" element={<A_MensCandB/>} />

      <Route path="/FootwearReport" element={<FootwearReport/>} />


      <Route path="/F_adminDashboard" element={<F_adminDashboard/>} />

      <Route path="/product-details" element={<F_ProductDetails/>} />
      <Route path="/product-details" element={<A_AdminDBCandB/>} />

      <Route path="/F_AdminReport" element={<F_AdminReport/>} />
      


      <Route path="/F_adminDashboard" element={<F_adminDashboard/>} />

      <Route path="/product-details" element={<F_ProductDetails/>} />
      <Route path="/product-details" element={<A_AdminDBCandB/>} />

      <Route path="/F_AdminReport" element={<F_AdminReport/>} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
