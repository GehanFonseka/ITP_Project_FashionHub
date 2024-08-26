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
const C_MensTMBlazerMeasurements = () => {
  const location = useLocation();
  const { blazerType, selectedColor } = location.state || {};
  const navigate = useNavigate();

  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    sleeve: '',
    length: ''
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
    if (measurements.chest && measurements.waist && measurements.sleeve && measurements.length) {
      navigate('/C_MensTMBlazerAddCart', {
        state: {
          blazerType,
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
        <p><strong>Blazer Type:</strong> {blazerType}</p>
        <p><strong>Selected Color:</strong> {selectedColor}</p>
      </SelectionDisplay>
      <Form onSubmit={handleSubmit}>
        <MeasurementField>
          <Label htmlFor="chest">Chest (in inches):</Label>
          <Description>Measure around the fullest part of your chest, keeping the tape under your arms and parallel to the floor.</Description>
          <Input id="chest" name="chest" type="number" value={measurements.chest} onChange={handleChange} required />
        </MeasurementField>
        <MeasurementField>
          <Label htmlFor="waist">Waist (in inches):</Label>
          <Description>Measure around your natural waistline, at the narrowest part of your waist, usually just above the belly button.</Description>
          <Input id="waist" name="waist" type="number" value={measurements.waist} onChange={handleChange} required />
        </MeasurementField>
        <MeasurementField>
          <Label htmlFor="sleeve">Sleeve Length (in inches):</Label>
          <Description>With your arm slightly bent, measure from the center back of your neck, over your shoulder, down to your wrist.</Description>
          <Input id="sleeve" name="sleeve" type="number" value={measurements.sleeve} onChange={handleChange} required />
        </MeasurementField>
        <MeasurementField>
          <Label htmlFor="length">Blazer Length (in inches):</Label>
          <Description>Measure from the top of your shoulder, near the base of your neck, down to where you want the blazer to end.</Description>
          <Input id="length" name="length" type="number" value={measurements.length} onChange={handleChange} required />
        </MeasurementField>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default C_MensTMBlazerMeasurements;
