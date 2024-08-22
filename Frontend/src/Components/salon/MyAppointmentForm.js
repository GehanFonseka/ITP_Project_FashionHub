import React from 'react';
import styled from 'styled-components';

const MyAppointmentForm = () => {
  const appointments = [
    {
      category: 'Facial',
      service: 'Basic Facial',
      dateTime: '13-Aug-2023 at 10:00 AM',
      price: 'LKR 1,000',
    },
    {
      category: 'Massage',
      service: 'Hair Coloring',
      dateTime: '13-Aug-2023 at 10:00 AM',
      price: 'LKR 5,000',
    },
    {
      category: 'Massage',
      service: 'Hot Stone Massage',
      dateTime: '13-Aug-2023 at 10:00 AM',
      price: 'LKR 5,000',
    },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title>MY APPOINTMENTS</Title>
        <BookNowButton href="/AppointmentForm">Book now</BookNowButton>
      </TitleContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Service Category</TableHeader>
            <TableHeader>Service Name</TableHeader>
            <TableHeader>Appointment Date & Time</TableHeader>
            <TableHeader>Price (LKR)</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableData>{appointment.category}</TableData>
              <TableData>{appointment.service}</TableData>
              <TableData>{appointment.dateTime}</TableData>
              <TableData>{appointment.price}</TableData>
              <TableData>
                <ActionButton>Edit</ActionButton>
                <ActionButton>Delete</ActionButton>
              </TableData>
            </TableRow>
          ))}
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

const ActionButton = styled.button`
  background-color: #ae2012;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #920d0d;
  }
`;

export default MyAppointmentForm;
