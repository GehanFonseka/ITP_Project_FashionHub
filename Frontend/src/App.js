import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Components/home/Header'; 
import HeroSection from './Components/home/HeroSection';
import LayoutWithSidebar from "./Components/Finance/LayoutWithSidebar";
import BLayout from './Components/Budget/BLayout';

import UserDashboard from './Components/Login1/userDashboard';
import Register from "./Components/Login1/Register";
import Login from "./Components/Login1/Login";
import LoginRegister from './Components/Login1/loginregisterA';

//Customer Support
import TicketRaisingForm from './Components/CustomerSupport/ticketRaise';
import ViewTickets from './Components/CustomerSupport/ViewTickets';
import TicketResponse from './Components/CustomerSupport/TicketResponse';
import Contact from './Components/CustomerSupport/Contact';
import ChatBotButton from './Components/CustomerSupport/ChatBotButton';
import ChatBot from './Components/CustomerSupport/ChatBot';

//minidu
import C_Home from './Components/Clothing/C_Home';
import C_MensCasual from './Components/Clothing/C_MensCasual';
import C_MensCasualPants from './Components/Clothing/C_MensCasualPants';
import C_MensCasualAndFormal from './Components/Clothing/C_MensCasualAndFormal';
import C_MensFormal from './Components/Clothing/C_MensFormal';
import C_MensFormalRM from './Components/Clothing/C_MensFormalRM';
import C_MensFormalTM from './Components/Clothing/C_MensFormalTM';
import C_TMMensBlazer from './Components/Clothing/C_TMMensBlazer';
import C_MensTMBlazerColors from './Components/Clothing/C_MensTMBlazerColors';
import C_MensTMBlazerMeasurements from './Components/Clothing/C_MensTMBlazerMeasurements';
import C_TMDetails from './Components/Clothing/C_TMDetails';
import C_WomensCasual from './Components/Clothing/C_WomensCasual';
import C_WomensFormal from './Components/Clothing/C_WomensFormal';
import C_WomensCasualAndFormal from './Components/Clothing/C_WomensCasualAndFormal';
import C_WomensFormalRM from './Components/Clothing/C_WomensFormalRM';
import C_WomensFormalTM from './Components/Clothing/C_WomensFormalTM';
import C_ProductDetails from './Components/Clothing/C_ProductDetails';
import C_AdminDB01 from './Components/Clothing/C_AdminDB01';
import C_AdminDBPants from './Components/Clothing/C_AdminDBPants'
import C_AdminDBSB from './Components/Clothing/C_AdminDBSB'
import C_AdminDBPantsTable from './Components/Clothing/C_AdminDBPantsTable'
import C_AdminDBUpdatePants from './Components/Clothing/C_AdminDBUpdatePants'
import C_AdminDBTMMensBlazer from './Components/Clothing/C_AdminDBTMMensBlazer'
import C_AdminSBTMMensBlazer from './Components/Clothing/C_AdminSBTMMensBlazer'
import C_AdminDBTMMensBlazerTable from './Components/Clothing/C_AdminDBTMMensBlazerTable';
import C_AdminDBUpdateTMMensBlazer from './Components/Clothing/C_AdminDBUpdateTMMensBlazer';
import C_AdminDBRMMensBlazer from './Components/Clothing/C_AdminDBRMMensBlazer';
import C_AdminSBRMMensBlazer from './Components/Clothing/C_AdminSBRMMensBlazer'
import C_AdminDBRMMensBlazerTable from './Components/Clothing/C_AdminDBRMMensBlazerTable';
import C_RMMensBlazer from './Components/Clothing/C_RMMensBlazer';
import C_AdminDBWCTshirt from './Components/Clothing/C_AdminDBWCTshirt';
import C_AdminDBWCTshirtTable from './Components/Clothing/C_AdminDBWCTshirtTable';
import C_AdminDBUpdateWCTshirt from './Components/Clothing/C_AdminDBUpdateWCTshirt';
import C_AdminSBWCTshirt from './Components/Clothing/C_AdminSBWCTshirt'
import C_WomensCasualTshirt from './Components/Clothing/C_WomensCasualTshirt'
import C_AdminDBTMWomensTrouser from './Components/Clothing/C_AdminDBTMWomensTrouser';
import C_AdminDBTMWomensTrouserTable from './Components/Clothing/C_AdminDBTMWomensTrouserTable';
import C_AdminDBUpdateTMWomensTrouser from './Components/Clothing/C_AdminDBUpdateTMWomensTrouser';
import C_AdminSBTMWomensTrouser from './Components/Clothing/C_AdminSBTMWomensTrouser';
import C_TMWomensTrouser from './Components/Clothing/C_TMWomensTrouser';
import C_WomensTMTrouserMeasurements from './Components/Clothing/C_WomensTMTrouserMeasurements';
import C_ColorSelection from './Components/Clothing/C_ColorSection';
import C_AdminReport from './Components/Clothing/C_AdminReport';
//matheesha
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



import F_adminDashboard from './Components/Footwear & Accessories/F_adminDashboard';

import A_ProductDetails from './Components/Accessories/A_ProductDetails';
import F_ProductDetails from './Components/Footwear & Accessories/F_ProductDetails'

import F_AdminReport from './Components/Footwear & Accessories/F_AdminReport';


import Footer from './Components/home/Footer';


//order
import Bill from "./Components/Order/Bill";
import Cart from "./Components/Order/Cart";
import Order from "./Components/Order/order";
import Track from "./Components/Order/track";
import OrderManage from "./Components/Order/OrderManage";

//budget
import ItemList from "./Components/Budget/ItemList";
import NavBar from "./Components/Budget/NavBar";
import FavoritePackagesPage from "./Components/Budget/FavoritePackagesPage"
import EditPackagePage from "./Components/Budget/EditPackagePage";


//salon
import Sidebar from './Components/salon/Sidebar';
import AppointmentForm from './Components/salon/AppointmentForm';
import Salonhome from './Components/salon/Salonhome';
import MyAppointmentForm from './Components/salon/MyAppointmentForm';
import Dashboard from './Components/salon/Dashboard';
import ServiceList from './Components/SalonAD/ServiceList';
import ServiceListAD from './Components/SalonAD/ServiceListAD';
import AllAppointments from './Components/SalonAD/ALLAppointments';
import ServicePopularityReport from './Components/SalonAD/ServicePopularityReport';

//Review
import ReviewForm from './Components/Review/ReviewForm';
import MyReviews from './Components/Review/MyReviews';
import ReviewDisplay from './Components/Review/ReviewDisplay';
import DashboardContainer from './Components/ReviewAdmin/DashboardContainer';

//finance
import BalanceSheet from "./Components/Finance/BalanceSheet";
import DisplayReport from "./Components/Finance/DisplayReport";
import EditReport from "./Components/Finance/EditReport";
import AddReport from "./Components/Finance/AddReport";
import Overview from "./Components/Finance/Overview";




// Custom component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();

  const noHeaderFooterPaths = ['/Dashboard', '/Register', '/Login','/BarChart','/balanceSheet','/displayreport','/editreport/:id','/EditReport/:id','/editReport/:id','/addreport','/Overview','/overview']; // Add paths where you don't want Header and Footer
  const onlyHeaderPaths = ['/ItemList']
;


  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);
  const showHeader = onlyHeaderPaths.includes(location.pathname);


  return (
    <div>
      {showHeader &&  <Header />} 
      {children}  
      {showHeaderFooter && !showHeader && <Footer />}
      {showHeaderFooter && <Header/>}
    </div>
  );
};



function App() {


  return (

    
    <Router>
      <Layout>
        <Routes>
      
        <Route path="/" element={<HeroSection />} />
        
          <Route path="/loginregister" element={<LoginRegister/>} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Salonhome" element={<><Sidebar /><Salonhome /></>} />
          <Route path="/AppointmentForm" element={<><Sidebar /><AppointmentForm /></>} />
          <Route path="/MyAppointmentForm" element={<><Sidebar /><MyAppointmentForm /></>} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ServicePopularityReport" element={<ServicePopularityReport />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          
          
         
            {/* Finance Routes */}
          <Route path="/BalanceSheet" element={<LayoutWithSidebar><BalanceSheet /></LayoutWithSidebar>} />
          <Route path="/DisplayReport" element={<LayoutWithSidebar><DisplayReport /></LayoutWithSidebar>} />
          <Route path="/EditReport/:id" element={<LayoutWithSidebar><EditReport /></LayoutWithSidebar>} />
          <Route path="/AddReport" element={<LayoutWithSidebar><AddReport /></LayoutWithSidebar> } />
          <Route path="/Overview" element={<LayoutWithSidebar> <Overview /> </LayoutWithSidebar>} />
          <Route path="/LoginRegister" element={<LoginRegister />} />

        <Route path="/ServiceList" element={<ServiceList />} />
        <Route path="/ServiceListAD" element={<ServiceListAD />} />
        <Route path="/AllAppointments" element={<AllAppointments />} />

       
        <Route path="/ReviewForm/:storeId" element={<ReviewForm/>} />
        <Route path="/ReviewDisplay" element={<ReviewDisplay/>} />
        <Route path="/MyReviews" element={<MyReviews/>} />
        <Route path="/DashboardContainer" element={<DashboardContainer/>} />
  
        <Route path="/C_Home" element={<C_Home />} />
        <Route path="/C_MensCasual" element={<C_MensCasual />} />
        <Route path="/C_MensCasualPants" element={<C_MensCasualPants />} />
        <Route path="/C_MensCasualAndFormal" element={<C_MensCasualAndFormal />} />
        <Route path="/C_MensFormal" element={<C_MensFormal />} />
        <Route path="/C_MensFormalRM" element={<C_MensFormalRM />} />
        <Route path="/C_MensFormalTM" element={<C_MensFormalTM />} />
        <Route path="/C_TMMensBlazer" element={<C_TMMensBlazer />} />
        <Route path="/C_MensTMBlazerColors" element={<C_MensTMBlazerColors />} />
        <Route path="/C_MensTMBlazerMeasurements" element={<C_MensTMBlazerMeasurements />} />
        <Route path="/C_TMDetails" element={<C_TMDetails />} />
        <Route path="/C_WomensCasual" element={<C_WomensCasual />} />
        <Route path="/C_WomensCasualAndFormal" element={<C_WomensCasualAndFormal />} />
        <Route path="/C_WomensFormal" element={<C_WomensFormal />} />
        <Route path="/C_WomensFormalRM" element={<C_WomensFormalRM />} />
        <Route path="/C_WomensFormalTM" element={<C_WomensFormalTM />} />
        <Route path="/C_AdminDB01" element={<C_AdminDB01 />} />
        <Route path="/C_AdminDBPants" element={<C_AdminDBPants/>}/>
        <Route path="/C_AdminDBSB" element={<C_AdminDBSB/>}/>
        <Route path="/C_AdminDBPantsTable" element={<C_AdminDBPantsTable/>}/>
        <Route path="/C_AdminDBUpdatePants" element={<C_AdminDBUpdatePants/>}/>
        <Route path="/C_AdminDBTMMensBlazer" element={<C_AdminDBTMMensBlazer/>}/>
        <Route path="/C_AdminSBTMMensBlazer" element={<C_AdminSBTMMensBlazer/>}/>
        <Route path="/C_AdminDBTMMensBlazerTable" element={<C_AdminDBTMMensBlazerTable/>}/>
        <Route path="/C_AdminDBUpdateTMMensBlazer" element={<C_AdminDBUpdateTMMensBlazer/>}/>
        <Route path="/C_AdminDBRMMensBlazer" element={<C_AdminDBRMMensBlazer/>}/>
        <Route path="/C_AdminSBRMMensBlazer" element={<C_AdminSBRMMensBlazer/>}/>
        <Route path="/C_AdminDBRMMensBlazerTable" element={<C_AdminDBRMMensBlazerTable/>}/>
        <Route path="/C_RMMensBlazer" element={<C_RMMensBlazer />} />
        <Route path="/C_AdminDBWCTshirt" element={<C_AdminDBWCTshirt/>}/>
        <Route path="/C_AdminDBWCTshirtTable" element={<C_AdminDBWCTshirtTable/>}/>
        <Route path="/C_AdminDBUpdateWCTshirt" element={<C_AdminDBUpdateWCTshirt/>}/>
        <Route path="/C_AdminSBWCTshirt" element={<C_AdminSBWCTshirt/>}/>
        <Route path="C_WomensCasualTshirt" element={<C_WomensCasualTshirt/>}/>
        <Route path="C_AdminDBTMWomensTrouser" element={<C_AdminDBTMWomensTrouser/>}/>
        <Route path="C_AdminDBTMWomensTrouserTable" element={<C_AdminDBTMWomensTrouserTable/>}/>
        <Route path="C_AdminDBUpdateTMWomensTrouser" element={<C_AdminDBUpdateTMWomensTrouser/>}/>
        <Route path="C_AdminSBTMWomensTrouser" element={<C_AdminSBTMWomensTrouser/>}/>
        <Route path="C_TMWomensTrouser" element={<C_TMWomensTrouser/>}/>
        <Route path="C_WomensTMTrouserMeasurements" element={<C_WomensTMTrouserMeasurements/>}/>
        <Route path="C_ColorSelection" element={<C_ColorSelection/>}/>

        <Route path="/C_AdminReport" element={<C_AdminReport/>} />
        <Route path="/product-details" element={<C_ProductDetails />} />

        <Route path="/ticket" element={<TicketRaisingForm />} />
        <Route path="/view" element={<ViewTickets />} />
        <Route path="/response" element={<TicketResponse />} />
        <Route path="/Contact" element={<Contact />} />


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
      


      <Route path="/F_adminDashboard" element={<F_adminDashboard/>} />


      <Route path="/product-details" element={<F_ProductDetails/>} />
      <Route path="/product-details" element={<A_AdminDBCandB/>} />


      <Route path="/F_AdminReport" element={<F_AdminReport/>} />

      
      <Route path="/ItemList" element={<ItemList/>} />
      <Route path="/FavoritePackages" element={<FavoritePackagesPage/>} />
      <Route path="/edit-package/:id" element={<EditPackagePage />} />


      <Route path="/BalanceSheet" element={<LayoutWithSidebar><BalanceSheet /></LayoutWithSidebar>} />
      
      
      
      


      <Route path="/bill" element={<Bill />} /> 
          <Route path="/Cart" element={<Cart />} /> 
          <Route path="/order" element={<Order />} />
          <Route path="/track" element={<Track />} />
          <Route path="/OrderManage" element={<OrderManage />} />

        </Routes>
        <ChatBotButton />
</Layout>
      </Router>

      

);}

export default App;
