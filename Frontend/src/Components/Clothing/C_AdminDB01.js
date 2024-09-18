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
`;

// Section for Men's and Women's Clothing
const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

// Section for clothing
const Section = styled.div`
  width: 45%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

// Title for each section
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
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
`;

// Button for each sub-category
const SubCategoryButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Button for generating reports
const GenerateReportButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    background-color: #218838;
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
            <SubCategoryButton to="/C_WomensCasualTShirts">T-Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_WomensCasualShirts">Shirts</SubCategoryButton>
          </CategoryContainer>
          
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/C_WomensFormalRMBlazers">Readymade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMShirts">Readymade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMTrousers">Readymade - Trousers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalTMBlazers">Tailormade - Blazers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalTMShirts">Tailormade - Shirts</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalTMTrouser">Tailormade - Trousers</SubCategoryButton>
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
