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
  max-width: 700px;  // Increased width for better section layout
`;

const Section = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
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
  font-size: 1rem;  // Increased font size for better visibility
  color: #444;      // Darker color for better contrast
  margin-top: 5px;  // Small margin to separate from the label
  margin-bottom: 10px;
  padding: 10px;    // Added padding for better readability
  border: 1px solid #ddd; // Light border to define the description area
  border-radius: 5px;     // Rounded corners for a smoother look
  background-color: #f5f5f5; // Light background color
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
  const { blazer, selectedColor } = location.state || {}; // Destructure blazer and selectedColor from state
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
          blazer,
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
        <p><strong>Blazer Type:</strong> {blazer?.name}</p>
        <p><strong>Selected Color:</strong> {selectedColor}</p>
        <p><strong>Price:</strong> {blazer?.price}</p>
      </SelectionDisplay>
      <Form onSubmit={handleSubmit}>
        <Section>
          <Heading as="h3">Chest Measurements</Heading>
          <MeasurementField>
            <Label htmlFor="chest">Chest (in inches):</Label>
            <Description>Measure around the fullest part of your chest, keeping the tape under your arms and parallel to the floor.</Description>
            <Input id="chest" name="chest" type="number" value={measurements.chest} onChange={handleChange} min="0" required />
          </MeasurementField>
        </Section>
        <Section>
          <Heading as="h3">Waist Measurements</Heading>
          <MeasurementField>
            <Label htmlFor="waist">Waist (in inches):</Label>
            <Description>Measure around your natural waistline, at the narrowest part of your waist, usually just above the belly button.</Description>
            <Input id="waist" name="waist" type="number" value={measurements.waist} onChange={handleChange} min="0" required />
          </MeasurementField>
        </Section>
        <Section>
          <Heading as="h3">Sleeve Measurements</Heading>
          <MeasurementField>
            <Label htmlFor="sleeve">Sleeve Length (in inches):</Label>
            <Description>With your arm slightly bent, measure from the center back of your neck, over your shoulder, down to your wrist.</Description>
            <Input id="sleeve" name="sleeve" type="number" value={measurements.sleeve} onChange={handleChange} min="0" required />
          </MeasurementField>
        </Section>
        <Section>
          <Heading as="h3">Blazer Length</Heading>
          <MeasurementField>
            <Label htmlFor="length">Blazer Length (in inches):</Label>
            <Description>Measure from the top of your shoulder, near the base of your neck, down to where you want the blazer to end.</Description>
            <Input id="length" name="length" type="number" value={measurements.length} onChange={handleChange} min="0" required />
          </MeasurementField>
        </Section>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default C_MensTMBlazerMeasurements;
