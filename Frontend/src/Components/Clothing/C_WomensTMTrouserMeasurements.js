import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Define all styled components at the top of the file
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  padding-top: 100px;
  padding-bottom: 50px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 2rem; /* Increased font size */
  text-align: center;
`;

const SelectionDisplay = styled.div`
  margin-bottom: 30px;
  font-size: 1.4rem; /* Increased font size */
  color: #555;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 80%;
  max-width: 900px;
`;

const Section = styled.section`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const MeasurementField = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem; /* Increased font size */
  margin-bottom: 5px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.1rem; /* Increased font size */
  color: #444;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.1rem; /* Increased font size */
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.1rem; /* Font size */
  border-radius: 5px;
  margin-top: 20px;
  align-self: center;
  transition: background-color 0.3s;
  max-width: 200px; /* Set maximum width */
  width: 100%; /* Ensure button takes up full width within the max-width constraint */
  text-align: center; /* Center text inside the button */

  &:hover {
    background-color: #555;
  }
`;

// Component definition
const C_WomensTMTrouserMeasurements = () => {
  const location = useLocation();
  const { item, selectedColor } = location.state || {}; // Destructure item and selectedColor from state
  const navigate = useNavigate();

  const [measurements, setMeasurements] = useState({
    waist: '',
    hip: '',
    length: '',
    inseam: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Regular expression to allow positive decimal numbers
    const regex = /^\d*\.?\d*$/; // Allows numbers with optional decimals
    if (regex.test(value) || value === '') { // Check if the value is a valid number or empty
      setMeasurements({
        ...measurements,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (measurements.waist && measurements.hip && measurements.length && measurements.inseam) {
      navigate('/C_TMDetails', {
        state: {
          item,
          selectedColor,
          measurements
        }
      });
    } else {
      alert('Please enter all measurements.');
    }
  };

  return (
    <Container>
      <Heading>Enter Your Measurements</Heading>
      <SelectionDisplay>
        <p><strong>Item Type:</strong> {item?.name}</p>
        <p><strong>Selected Color:</strong> {selectedColor}</p>
        <p><strong>Price:</strong> LKR{item?.price}</p>
      </SelectionDisplay>
      <Form onSubmit={handleSubmit}>
        <Section>
          <MeasurementField>
            <Label htmlFor="waist">Waist:</Label>
            <Input
              type="text" // Change to text to allow decimals
              id="waist"
              name="waist"
              value={measurements.waist}
              onChange={handleChange}
              placeholder="Enter waist measurement"
            />
            <Description>Measure around your natural waistline, typically just above the belly button.</Description>
          </MeasurementField>
          <MeasurementField>
            <Label htmlFor="hip">Hip:</Label>
            <Input
              type="text" // Change to text to allow decimals
              id="hip"
              name="hip"
              value={measurements.hip}
              onChange={handleChange}
              placeholder="Enter hip measurement"
            />
            <Description>Measure around the fullest part of your hips, keeping the tape parallel to the floor.</Description>
          </MeasurementField>
        </Section>
        <Section>
          <MeasurementField>
            <Label htmlFor="length">Length:</Label>
            <Input
              type="text" // Change to text to allow decimals
              id="length"
              name="length"
              value={measurements.length}
              onChange={handleChange}
              placeholder="Enter length measurement"
            />
            <Description>Measure from the base of your waist to where you want the trouser to end.</Description>
          </MeasurementField>
          <MeasurementField>
            <Label htmlFor="inseam">Inseam:</Label>
            <Input
              type="text" // Change to text to allow decimals
              id="inseam"
              name="inseam"
              value={measurements.inseam}
              onChange={handleChange}
              placeholder="Enter inseam measurement"
            />
            <Description>Measure from the crotch to the bottom of the leg.</Description>
          </MeasurementField>
        </Section>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default C_WomensTMTrouserMeasurements;
