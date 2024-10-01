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
  padding-top: 70px;
  padding-bottom: 50px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
`;

const SelectionDisplay = styled.div`
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 500px;
`;

const MeasurementField = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 20px;
  align-self: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

// Component definition
const ShoesSize = () => {
  const location = useLocation();
  const { shoeType, selectedColor } = location.state || {};
  const navigate = useNavigate();

  const [measurements, setMeasurements] = useState({
    size: '',
    width: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements({
      ...measurements,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (measurements.size && measurements.width) {
      navigate('/C_MensTMShoeAddCart', {
        state: {
          shoeType,
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
      <Heading>Enter Your Shoe Measurements</Heading>
      <SelectionDisplay>
        <p><strong>Shoe Type:</strong> {shoeType}</p>
        <p><strong>Selected Color:</strong> {selectedColor}</p>
      </SelectionDisplay>
      <Form onSubmit={handleSubmit}>
        <MeasurementField>
          <Label htmlFor="size">Shoe Size:</Label>
          <Description>Select your shoe size.</Description>
          <Input id="size" name="size" type="number" value={measurements.size} onChange={handleChange} required />
        </MeasurementField>
        <MeasurementField>
          <Label htmlFor="width">Width:</Label>
          <Description>Select the width of your foot (e.g., narrow, medium, wide).</Description>
          <Input id="width" name="width" type="text" value={measurements.width} onChange={handleChange} required />
        </MeasurementField>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default ShoesSize;
