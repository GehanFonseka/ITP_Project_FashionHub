import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Container for the entire dashboard
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
  padding-top: 80px; /* Add top padding to account for the header height */
  background-color: #f9f9f9; /* Light background for better contrast */
  font-family: 'Arial', sans-serif; /* More modern font */
`;

// Section for Men's and Women's Clothing
const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px; /* Space between sections */
`;

// Section for clothing
const Section = styled.div`
  width: 45%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff; /* White background for sections */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition: transform 0.2s; /* Transition for hover effect */

  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
  }
`;

// Title for each section
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem; /* Larger title size */
  color: #555; /* Using your primary color */
  text-transform: uppercase; /* Uppercase for emphasis */
`;

// Container for categories within each section
const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

// Category title
const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #555;
  text-decoration: underline; /* Underlined category title */
`;

// Button for each sub-category
const SubCategoryButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #8b0000; /* Primary button color */
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */

  &:hover {
    background-color: #E76F51; /* Darker shade on hover */
    transform: translateY(-2px); /* Lift effect on hover */
  }
`;

// Button for generating reports
const GenerateReportButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: #fff;
  background-color:  #8b0000; /* Green button color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */
  
  &:hover {
    background-color: #B22222; /* Darker shade on hover */
    transform: translateY(-2px); /* Lift effect on hover */
  }
`;

const C_AdminDB01 = () => {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate('/C_AdminReport');
  };

  return (
    <DashboardContainer>
      <SectionContainer>
        {/* Men's Clothing Section */}
        <Section>
          <SectionTitle>Mens Clothing</SectionTitle>
          
          <CategoryContainer>
            <CategoryTitle>Casual</CategoryTitle>
            <SubCategoryButton to="/C_AdminDBSB">Pants</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualTShirts">T-Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualShirts">Shirts</SubCategoryButton>
          </CategoryContainer>
          
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/C_AdminSBRMMensBlazer">Readymade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMShirts">Readymade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMTrousers">Readymade - Trousers</SubCategoryButton>
            <SubCategoryButton to="/C_AdminSBTMMensBlazer">Tailormade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalTMShirts">Tailormade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalTMTrousers">Tailormade - Trousers</SubCategoryButton>
          </CategoryContainer>
        </Section>

        {/* Women's Clothing Section */}
        <Section>
          <SectionTitle>Womens Clothing</SectionTitle>
          
          <CategoryContainer>
            <CategoryTitle>Casual</CategoryTitle>
            <SubCategoryButton to="/C_WomensCasualPants">Pants</SubCategoryButton>
            <SubCategoryButton to="/C_AdminSBWCTshirt">T-Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_WomensCasualShirts">Shirts</SubCategoryButton>
          </CategoryContainer>
          
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/C_WomensFormalRMBlazers">Readymade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMShirts">Readymade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMTrousers">Readymade - Trousers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalTMBlazers">Tailormade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalTMShirts">Tailormade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_AdminSBTMWomensTrouser">Tailormade - Trousers</SubCategoryButton>
          </CategoryContainer>
        </Section>
      </SectionContainer>

      <GenerateReportButton onClick={handleGenerateReport}>
        Generate Report
      </GenerateReportButton>
    </DashboardContainer>
  );
};

export default C_AdminDB01;
