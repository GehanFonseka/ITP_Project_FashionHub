import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Container for the entire dashboard
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: auto;
  padding: 20px;
  padding-top: 80px; /* Add top padding to account for the header height */
`;

// Wrapper for both Footwear and Accessories sections
const TableWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 40px; /* Add margin between the two main tables */
`;

// Section for Men's and Women's Footwear and Accessories
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

// Styled button for Generate Report
const GenerateReportButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #28a745; /* Green color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;

const F_adminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGenerateReport = () => {
    navigate('/FootwearReport'); // Redirect to FootwearReport component when clicked
  };

  return (
    <DashboardContainer>
      {/* Footwear Sections */}
      <TableWrapper>
        {/* Men's Footwear Section */}
        <Section>
          <SectionTitle>Mens Footwear</SectionTitle>
          <CategoryContainer>
            <CategoryTitle>Casual</CategoryTitle>
            <SubCategoryButton to="/AdminDBSB">Sneakers</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualTShirts">Slides</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualShirts">Canvas Shoes</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/AdminSBMensOfficeShoes">Office - Shoes</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMShirts">Loafers</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMTrousers">Boots</SubCategoryButton>
          </CategoryContainer>
        </Section>

        {/* Women's Footwear Section */}
        <Section>
          <SectionTitle>Womens Footwear</SectionTitle>
          <CategoryContainer>
            <CategoryTitle>Casual</CategoryTitle>
            <SubCategoryButton to="/AdminDBWSneakers">Sneakers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensCasualTShirts">Slippers</SubCategoryButton>
            <SubCategoryButton to="/AdminSBWomensBoots">Boots</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/C_WomensFormalRMBlazers">Court Shoes</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMShirts">Loafers</SubCategoryButton>
            <SubCategoryButton to="/C_WomensFormalRMTrousers">Heels</SubCategoryButton>
          </CategoryContainer>
        </Section>
      </TableWrapper>

      {/* Accessories Sections */}
      <TableWrapper>
        {/* Men's Accessories Section */}
        <Section>
          <SectionTitle>Mens Accessories</SectionTitle>
          <CategoryContainer>
            <SubCategoryButton to="/A_AdminSBMenCandB">Chains & Bracelets</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminMensBelts">Belts</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminMensWatches">Watches</SubCategoryButton>
          </CategoryContainer>
        </Section>

        {/* Women's Accessories Section */}
        <Section>
          <SectionTitle>Womens Accessories</SectionTitle>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensChainsBracelets">Chains & Bracelets</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensBelts">Belts</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensWatches">Watches</SubCategoryButton>
          </CategoryContainer>
        </Section>
      </TableWrapper>

      {/* Generate Report Button */}
      <GenerateReportButton onClick={handleGenerateReport}>
        Generate Report
      </GenerateReportButton>
    </DashboardContainer>
  );
};

export default F_adminDashboard;
