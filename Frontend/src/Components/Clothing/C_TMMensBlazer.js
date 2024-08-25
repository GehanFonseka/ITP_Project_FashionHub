import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import C15 from '../../assets/C15.webp'; 
import C16 from '../../assets/C16.jpg';
import C17 from '../../assets/C17.jpg';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* Changed from height to min-height */
  margin: 0;
  padding-top: 50px;
  padding-bottom: 50px; /* Optional: Add some padding at the bottom */
  position: relative; /* Needed for absolute positioning of the button */
`;

// Quote section (or header)
const Quote = styled.h2`
  margin-bottom: 30px;
  margin-top: 70px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
  padding: 0 20px;
`;

// Row container for blazer and its info
const BlazerRow = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-bottom: 30px;
  cursor: pointer; /* Add cursor to indicate clickable rows */
`;

// Image container for each blazer
const ImageBox = styled.div`
  flex: 1;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: ${(props) => (props.isSelected ? '3px solid #333' : 'none')}; /* Add border if selected */
`;

// Information box next to each blazer
const InfoBox = styled.div`
  flex: 1;
  padding: 20px;
  text-align: left;
  color: #333;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

// Styled Next button
const NextButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const C_TMMensBlazer = () => {
  const [selectedBlazer, setSelectedBlazer] = useState(null); // State to track selected blazer
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle blazer selection
  const handleBlazerClick = (blazerType) => {
    setSelectedBlazer(blazerType);
  };

  // Function to handle navigation on Next button click
  const handleNextClick = () => {
    if (selectedBlazer) {
      // You can store the selected blazer information as needed, e.g., in local storage or pass it via route
      navigate('/C_MensTMBlazerColors'); // Replace '/next-page' with the actual route you want to navigate to
    } else {
      alert('Please select a blazer type before proceeding.');
    }
  };

  return (
    <Container>
      <Quote>Select the Blazer Type</Quote>
      <BlazerRow onClick={() => handleBlazerClick('Double Breasted')}>
        <ImageBox style={{ backgroundImage: `url(${C15})` }} isSelected={selectedBlazer === 'Double Breasted'} />
        <InfoBox>
          <h3>Double Breasted</h3>
          <p>A timeless design crafted from high-quality materials. Perfect for formal occasions and professional settings.</p>
        </InfoBox>
      </BlazerRow>
      <BlazerRow onClick={() => handleBlazerClick('Single Breasted')}>
        <ImageBox style={{ backgroundImage: `url(${C16})` }} isSelected={selectedBlazer === 'Single Breasted'} />
        <InfoBox>
          <h3>Single Breasted</h3>
          <p>Featuring a contemporary cut and style, this blazer is designed for the fashion-forward individual.</p>
        </InfoBox>
      </BlazerRow>
      <BlazerRow onClick={() => handleBlazerClick('Slim Fit')}>
        <ImageBox style={{ backgroundImage: `url(${C17})` }} isSelected={selectedBlazer === 'Slim Fit'} />
        <InfoBox>
          <h3>Slim Fit</h3>
          <p>Combining comfort and style, this blazer is ideal for a relaxed yet sophisticated look.</p>
        </InfoBox>
      </BlazerRow>

      {/* Next button */}
      <NextButton onClick={handleNextClick}>Next</NextButton>
    </Container>
  );
};

export default C_TMMensBlazer;
