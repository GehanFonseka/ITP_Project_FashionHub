import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/home/Header';
import HeroSection from './Components/home/HeroSection';
import C_Home from './Components/Clothing/C_Home';
import C_MensCasual from './Components/Clothing/C_MensCasual';
import C_MensCasualAndFormal from './Components/Clothing/C_MensCasualAndFormal';
import C_MensFormal from './Components/Clothing/C_MensFormal';
import C_MensFormalRM from './Components/Clothing/C_MensFormalRM';
import C_MensFormalTM from './Components/Clothing/C_MensFormalTM';
import C_TMMensBlazer from './Components/Clothing/C_TMMensBlazer'
import C_MensTMBlazerColors from './Components/Clothing/C_MensTMBlazerColors'
import C_MensTMBlazerMeasurements from './Components/Clothing/C_MensTMBlazerMeasurements'
import C_WomansCasual from './Components/Clothing/C_WomansCasual';
import C_WomansFormal from './Components/Clothing/C_WomansFormal';
import C_WomensCasualAndFormal from './Components/Clothing/C_WomensCasualAndFormal';

import Footer from './Components/home/Footer';

function App() {
  return (
    <Router>
    
      <Header />
     
      <Routes>
      
      <Route path="/" element={<HeroSection/>} />
      <Route path="/C_Home" element={<C_Home/>} />
      <Route path="/C_MensCasual" element={<C_MensCasual/>} />
      <Route path="/C_MensCasualAndFormal" element={<C_MensCasualAndFormal/>} />
      <Route path="/C_MensFormal" element={<C_MensFormal/>} />
      <Route path="/C_MensFormalRM" element={<C_MensFormalRM/>} />
      <Route path="/C_MensFormalTM" element={<C_MensFormalTM/>} />
      <Route path="/C_TMMensBlazer" element={<C_TMMensBlazer/>} />
      <Route path="/C_MensTMBlazerColors" element={<C_MensTMBlazerColors/>} />
      <Route path="C_MensTMBlazerMeasurements" element={<C_MensTMBlazerMeasurements/>}/>
      <Route path="/C_WomansCasual" element={<C_WomansCasual/>} />
      <Route path="/C_WomensCasualAndFormal" element={<C_WomensCasualAndFormal/>} />
      <Route path="/C_WomansFormal" element={<C_WomansFormal/>} />


      
      </Routes>

      <Footer/>
    </Router>
  );
 
}

export default App;
