import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from '../../utilities/axios'; // Import your axios instance

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
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
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '3px solid #333' : 'none')}; // Highlight selected blazer
`;

// Image container for each blazer
const ImageBox = styled.div`
  flex: 1;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

// Information box next to each blazer
const InfoBox = styled.div`
  flex: 1;
  padding: 20px;
  text-align: left;
  color: #333;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.9);
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
  const [blazers, setBlazers] = useState([]);
  const [selectedBlazer, setSelectedBlazer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlazers = async () => {
      try {
        const response = await axios.get('/api/tm-mensblazers'); // Update the API endpoint as needed
        setBlazers(response.data);
      } catch (error) {
        console.error("Error fetching blazers:", error);
      }
    };

    fetchBlazers();
  }, []);

  const handleBlazerClick = (blazer) => {
    setSelectedBlazer(blazer);
  };

  const handleNextClick = () => {
    if (selectedBlazer) {
      navigate('/C_ColorSelection', { state: { itemType: 'Blazer', item: selectedBlazer } });
    } else {
      alert('Please select a blazer type before proceeding.');
    }
  };

  return (
    <Container>
      <Quote>Select the Blazer Type</Quote>
      {blazers.map((blazer) => (
        <BlazerRow
          key={blazer._id}
          isSelected={selectedBlazer?._id === blazer._id}
          onClick={() => handleBlazerClick(blazer)}
        >
          <ImageBox
            style={{ backgroundImage: `url(http://localhost:5000/uploads/${blazer.image})` }}
          />
          <InfoBox>
            <h3>{blazer.name}</h3> 
            <p>Price: LKR{blazer.price}</p>
            <p>{blazer.description}</p>
          </InfoBox>
        </BlazerRow>
      ))}
      <NextButton onClick={handleNextClick}>Next</NextButton>
    </Container>
  );
};

export default C_TMMensBlazer;
