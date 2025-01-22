import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyAppointmentForm = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointment/');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    navigate('/AppointmentForm', { state: { editData: appointment } });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/appointment/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Error deleting appointment. Please try again.');
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>My Appointments</Title>
        <BookNowButton href="/AppointmentForm">Book now</BookNowButton>
      </TitleContainer>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Contact Number</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Services</TableHeader>
                <TableHeader>Total Cost (LKR)</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableData>{appt.name}</TableData>
                  <TableData>{appt.contactNumber}</TableData>
                  <TableData>{appt.email}</TableData>
                  <TableData>{new Date(appt.date).toLocaleDateString()}</TableData>
                  <TableData>{appt.time}</TableData>
                  <TableData>{appt.services.join(', ')}</TableData>
                  <TableData>{appt.totalCost ? appt.totalCost.toFixed(2) : 'N/A'}</TableData>
                  <TableData>
                    <ActionButtonContainer>
                      <ActionButton onClick={() => handleEdit(appt)}>Edit</ActionButton>
                      <ActionButton onClick={() => handleDelete(appt._id)}>Delete</ActionButton>
                    </ActionButtonContainer>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 80px;
  margin-top: 100px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #333333;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BookNowButton = styled.a`
  padding: 10px 20px;
  background-color: #E76F51;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #C65D3A;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    /* Make sure the table scrolls horizontally on smaller screens */
    max-width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    min-width: 600px; /* Ensure that the table is wide enough to contain all columns */
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #333333;
  color: #ffffff;
  text-align: left;
  border-bottom: 2px solid #dddddd;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #F7F7F7;
  }
`;

const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #dddddd;
  color: #333333;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.85rem;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background-color: #AE2012;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #920D0D;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`;

export default MyAppointmentForm;
