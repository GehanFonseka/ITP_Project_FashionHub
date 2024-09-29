import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Container for the entire dashboard
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 80px; /* Add top padding to account for the header height */
  background-color: #f5f5dc; /* Light brown background */
`;

// Wrapper for both Footwear and Accessories sections using grid layout
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive columns */
  gap: 30px; /* Space between grid items */
  width: 100%;
  margin-bottom: 40px; /* Add margin below the grid */
`;

// Section for Men's and Women's Footwear and Accessories
const Section = styled.div`
  padding: 20px;
  border: 1px solid #ccc; /* Light border */
  border-radius: 12px; /* Rounded corners */
  background: linear-gradient(145deg, #ffffff, #e6e6e6); /* Gradient background */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.9); /* Subtle shadow for depth */
  transition: all 0.3s ease; /* Animation for hover effect */

  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
  }
`;

// Title for each section
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem; /* Increased font size for titles */
  color: #4b3d24; /* Darker brown for a more sophisticated look */
`;

// Container for categories within each section
const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

// Category title
const CategoryTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: #7f4f24; /* Darker brown for category titles */
  border-bottom: 2px solid #7f4f24; /* Underline for category titles */
  padding-bottom: 5px; /* Spacing below the title */
`;

// Button for each sub-category
const SubCategoryButton = styled(Link)`
  display: block;
  width: 90%; /* Shorter width to match background box */
  max-width: 250px; /* Max width for better control */
  padding: 12px; /* Padding for the button */
  margin: 10px auto; /* Centered with auto margin */
  font-size: 1.2rem;
  color: #fff;
  background-color: #a0522d; /* Light brown for buttons */
  text-align: center;
  text-decoration: none;
  border-radius: 8px; /* Rounded button corners */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Transition for hover effects */

  &:hover {
    background-color: #8b4513; /* Darker brown on hover */
    transform: translateY(-3px); /* Slight lift on hover */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Shadow on hover */
  }
`;

// Styled button for Generate Report
const GenerateReportButton = styled.button`
  padding: 15px 30px;
  font-size: 1.5rem; /* Larger font size for better visibility */
  color: #fff;
  background-color: #27ae60; /* Green color for 'Generate Report' */
  border: none;
  border-radius: 8px; /* Rounded button corners */
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s; /* Transition for hover effects */

  &:hover {
    background-color: #219653; /* Darker green on hover */
    transform: translateY(-3px); /* Slight lift on hover */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Shadow on hover */
  }
`;

// Spacing adjustment for accessory sections
const AccessoriesSection = styled(Section)`
  margin-top: 30px; /* Extra margin above the accessory sections */
`;

const F_adminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGenerateReport = () => {
    navigate('/F_AdminReport'); // Redirect to FootwearReport component when clicked
  };

  return (
    <DashboardContainer>
      {/* Footwear Sections */}
      <GridWrapper>
        {/* Men's Footwear Section */}
        <Section>
          <SectionTitle>Men's Footwear</SectionTitle>
          <CategoryContainer>
            <CategoryTitle>Casual</CategoryTitle>
            <SubCategoryButton to="/AdminDBSB">Sneakers</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualTShirts">Slides</SubCategoryButton>
            <SubCategoryButton to="/C_MensCasualShirts">Canvas Shoes</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryTitle>Formal</CategoryTitle>
            <SubCategoryButton to="/AdminSBMensOfficeShoes">Office Shoes</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMShirts">Loafers</SubCategoryButton>
            <SubCategoryButton to="/C_MensFormalRMTrousers">Boots</SubCategoryButton>
          </CategoryContainer>
        </Section>

        {/* Women's Footwear Section */}
        <Section>
          <SectionTitle>Women's Footwear</SectionTitle>
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

        {/* Men's Accessories Section */}
        <AccessoriesSection>
          <SectionTitle>Men's Accessories</SectionTitle>
          <CategoryContainer>
            <SubCategoryButton to="/A_AdminSBMenCandB">Chains & Bracelets</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminMensBelts">Belts</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminMensWatches">Watches</SubCategoryButton>
          </CategoryContainer>
        </AccessoriesSection>

        {/* Women's Accessories Section */}
        <AccessoriesSection>
          <SectionTitle>Women's Accessories</SectionTitle>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensChainsBracelets">Chains & Bracelets</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensBelts">Belts</SubCategoryButton>
          </CategoryContainer>
          <CategoryContainer>
            <SubCategoryButton to="/AdminWomensWatches">Watches</SubCategoryButton>
          </CategoryContainer>
        </AccessoriesSection>
      </GridWrapper>

      {/* Generate Report Button */}
      <GenerateReportButton onClick={handleGenerateReport}>
        Generate Report
      </GenerateReportButton>
    </DashboardContainer>
  );
};

export default F_adminDashboard;
