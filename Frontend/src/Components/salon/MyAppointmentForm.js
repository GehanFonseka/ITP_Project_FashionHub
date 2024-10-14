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
        const response = await axios.get('/api/appointment');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        
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
                <TableData>{appt.totalCost ? appt.totalCost.toFixed(2) : 'N/A'}</TableData> {/* Handle undefined totalCost */}
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
      )}
    </Container>
  );
};

// Styled Components (same as before)
const Container = styled.div`
  margin: 80px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  font-family: 'Roboto', sans-serif; /* Set body font */
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
  font-family: 'Poppins', sans-serif; /* Set font for the title */
`;

const BookNowButton = styled.a`
  padding: 10px 20px;
  background-color: #E76F51;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-family: 'Lato', sans-serif; /* Set font for the button */

  &:hover {
    background-color: #5C646;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-family: 'Roboto', sans-serif; /* Set font for table data */
`;

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background-color: #ae2012;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  text-align: center;
  font-family: 'Lato', sans-serif; /* Set font for action button */

  &:hover {
    background-color: #920d0d;
  }
`;


export default MyAppointmentForm;
