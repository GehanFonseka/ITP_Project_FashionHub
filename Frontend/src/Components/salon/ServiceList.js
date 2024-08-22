import React from 'react';
import styled from 'styled-components';

const ServiceList = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>SERVICE LIST</Title>
        <BookNowButton href="/AppointmentForm">Book Now</BookNowButton>
      </TitleContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Service Category</TableHeader>
            <TableHeader>Service Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Price (LKR)</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableData>Hair</TableData>
            <TableData>Haircut</TableData>
            <TableData>Basic haircut and styling</TableData>
            <TableData>LKR 1,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Hair</TableData>
            <TableData>Hair Coloring</TableData>
            <TableData>Full hair coloring</TableData>
            <TableData>LKR 5,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Hair</TableData>
            <TableData>Hair Treatment</TableData>
            <TableData>Deep conditioning treatment</TableData>
            <TableData>LKR 5,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Hair</TableData>
            <TableData>Hair Extensions</TableData>
            <TableData>Adding extensions for volume/length</TableData>
            <TableData>LKR 2,500</TableData>
          </TableRow>
          <TableRow>
            <TableData>Facial</TableData>
            <TableData>Basic Facial</TableData>
            <TableData>Cleansing, exfoliation, and hydration</TableData>
            <TableData>LKR 2,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Facial</TableData>
            <TableData>Anti-Aging Facial</TableData>
            <TableData>Treatment focused on reducing wrinkles</TableData>
            <TableData>LKR 3,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Facial</TableData>
            <TableData>Acne Treatment Facial</TableData>
            <TableData>Facial targeting acne-prone skin</TableData>
            <TableData>LKR 5,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Facial</TableData>
            <TableData>Brightening Facial</TableData>
            <TableData>Facial for a glowing complexion</TableData>
            <TableData>LKR 4,500</TableData>
          </TableRow>
          <TableRow>
            <TableData>Body Treatment</TableData>
            <TableData>Body Scrub</TableData>
            <TableData>Full-body exfoliation and hydration</TableData>
            <TableData>LKR 6,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Body Treatment</TableData>
            <TableData>Body Wrap</TableData>
            <TableData>Detoxifying body wrap</TableData>
            <TableData>LKR 5,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Body Treatment</TableData>
            <TableData>Cellulite Treatment</TableData>
            <TableData>Targeted treatment for cellulite</TableData>
            <TableData>LKR 6,500</TableData>
          </TableRow>
          <TableRow>
            <TableData>Nail</TableData>
            <TableData>Manicure</TableData>
            <TableData>Basic manicure with polish</TableData>
            <TableData>LKR 3,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Nail</TableData>
            <TableData>Nail Art</TableData>
            <TableData>Custom designs and artwork</TableData>
            <TableData>LKR 3,500</TableData>
          </TableRow>
          <TableRow>
            <TableData>Nail</TableData>
            <TableData>Pedicure</TableData>
            <TableData>Basic pedicure with polish</TableData>
            <TableData>LKR 4,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Makeup</TableData>
            <TableData>Basic Makeup Application</TableData>
            <TableData>Full-face makeup for events</TableData>
            <TableData>LKR 6,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Makeup</TableData>
            <TableData>Bridal Makeup</TableData>
            <TableData>Wedding day makeup application</TableData>
            <TableData>LKR 10,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Makeup</TableData>
            <TableData>Makeup Lesson</TableData>
            <TableData>One-on-one makeup tutorial</TableData>
            <TableData>LKR 20,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Massage</TableData>
            <TableData>Swedish Massage</TableData>
            <TableData>Relaxing full-body massage</TableData>
            <TableData>LKR 7,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Massage</TableData>
            <TableData>Deep Tissue Massage</TableData>
            <TableData>Intensive massage targeting deep muscle layers</TableData>
            <TableData>LKR 10,000</TableData>
          </TableRow>
          <TableRow>
            <TableData>Massage</TableData>
            <TableData>Hot Stone Massage</TableData>
            <TableData>Relaxing massage using heated stones</TableData>
            <TableData>LKR 12,000</TableData>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  margin: 80px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const BookNowButton = styled.a`
  padding: 10px 20px;
  background-color: #ae2012;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #920d0d;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

// Default export
export default ServiceList;
