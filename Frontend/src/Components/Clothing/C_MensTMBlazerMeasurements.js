import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Container for the entire page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
`;

// Heading section
const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
  text-align: center;
`;

// Blazer and Color Display
const InfoDisplay = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const InfoItem = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

// Measurement form section
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #555;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #777;
`;

// Submit button
const SubmitButton = styled.button`
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

const MeasurementPage = () => {
  // Sample selected data
  const selectedBlazer = "Tailor-Made Blazer";
  const selectedColor = "#274C77"; // Example color

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Measurements submitted');
  };

  return (
    <Container>
      <Heading>Enter Your Measurements</Heading>
      <InfoDisplay>
        <InfoItem><strong>Selected Blazer:</strong> {selectedBlazer}</InfoItem>
        <InfoItem><strong>Selected Color:</strong> <span style={{ backgroundColor: selectedColor, padding: '0 10px', color: '#fff' }}>{selectedColor}</span></InfoItem>
      </InfoDisplay>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="chest">Chest</Label>
        <Input id="chest" type="text" placeholder="Enter your chest measurement (e.g., 40 inches)" />
        <Description>Measure around the fullest part of your chest, keeping the tape level and snug.</Description>
        
        <Label htmlFor="waist">Waist</Label>
        <Input id="waist" type="text" placeholder="Enter your waist measurement (e.g., 32 inches)" />
        <Description>Measure around your natural waistline, keeping the tape level and snug.</Description>

        <Label htmlFor="hips">Hips</Label>
        <Input id="hips" type="text" placeholder="Enter your hip measurement (e.g., 42 inches)" />
        <Description>Measure around the fullest part of your hips and buttocks, keeping the tape level.</Description>

        {/* Add more measurement fields as needed */}

        <SubmitButton type="submit">Submit Measurements</SubmitButton>
      </Form>
    </Container>
  );
};

export default MeasurementPage;
