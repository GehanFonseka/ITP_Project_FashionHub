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

// Row container for trouser and its info
const TrouserRow = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-bottom: 30px;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '3px solid #333' : 'none')}; // Highlight selected trouser
`;

// Image container for each trouser
const ImageBox = styled.div`
  flex: 1;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

// Information box next to each trouser
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

const C_TMWomensTrouser = () => {
  const [trousers, setTrousers] = useState([]);
  const [selectedTrouser, setSelectedTrouser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrousers = async () => {
      try {
        const response = await axios.get('/api/tm-womenstrousers'); // Update the API endpoint as needed
        setTrousers(response.data);
      } catch (error) {
        console.error("Error fetching trousers:", error);
      }
    };

    fetchTrousers();
  }, []);

  const handleTrouserClick = (trouser) => {
    setSelectedTrouser(trouser);
  };

  const handleNextClick = () => {
    if (selectedTrouser) {
      navigate('/C_ColorSelection', { state: { itemType: 'Trouser', item: selectedTrouser } });
    } else {
      alert('Please select a trouser type before proceeding.');
    }
  };

  return (
    <Container>
      <Quote>Select the Trouser Type</Quote>
      {trousers.map((trouser) => (
        <TrouserRow
          key={trouser._id}
          isSelected={selectedTrouser?._id === trouser._id}
          onClick={() => handleTrouserClick(trouser)}
        >
          <ImageBox
            style={{ backgroundImage: `url(http://localhost:5000/uploads/${trouser.image})` }}
          />
          <InfoBox>
            <h3>{trouser.name}</h3>
            <p>Price: ${trouser.price}</p>
            <p>{trouser.description}</p>
          </InfoBox>
        </TrouserRow>
      ))}
      <NextButton onClick={handleNextClick}>Next</NextButton>
    </Container>
  );
};

export default C_TMWomensTrouser;
