import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; // Import the Bar chart from Chart.js

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [serviceStats, setServiceStats] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointment');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services'); // Adjust the endpoint as needed
        setServiceCategories(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchServiceStats = async () => {
      try {
        const response = await axios.get('/api/service-stats');
        setServiceStats(response.data);
      } catch (error) {
        console.error('Error fetching service stats:', error);
      }
    };

    fetchAppointments();
    fetchServices();
    fetchServiceStats();
  }, []);

  // Filter appointments
const filterAppointments = () => {
  return appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!start || apptDate >= start) && (!end || apptDate <= end);

    // Update category matching logic
    const matchesCategory = selectedCategory
      ? appt.services.some(service => getServiceCategory(service) === selectedCategory)
      : true;

    return matchesDateRange && matchesCategory;
  });
};


  // Function to get the service category
  const getServiceCategory = (service) => {
    const serviceCategories = {
      "shave": "Hair",
      "gfhfhhf": "Hair",
      "Facial": "Facial",
      "Nail": "Nail",
      "Makeup": "Makeup",
      "Massage": "Massage",
      // Add more services and their corresponding categories as needed
    };
    return serviceCategories[service] || null; // Return null if not found
  };

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(serviceStats),
    datasets: [
      {
        label: 'Number of Bookings',
        data: Object.values(serviceStats),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Appointments</Title>
      </TitleContainer>

      {/* Date Filter Section */}
      <FilterContainer>
        <DateLabel>Start Date:</DateLabel>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DateLabel>End Date:</DateLabel>
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        
         {/* Service Category Filter */}
         <DateLabel>Service Category:</DateLabel>
        <SelectInput
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} 
        >
          <option value="">All Categories</option>
          <option value="Hair">Hair</option>
          <option value="Facial">Facial</option>
          <option value="Nail">Nail</option>
          <option value="Makeup">Makeup</option>
          <option value="Massage">Massage</option>
        </SelectInput>
      </FilterContainer>

      {filterAppointments().length === 0 ? (
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
              <TableHeader>Special Requests</TableHeader>
              <TableHeader>Total Amount (LKR)</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filterAppointments().map((appt) => (
              <TableRow key={appt._id}>
                <TableData>{appt.name}</TableData>
                <TableData>{appt.contactNumber}</TableData>
                <TableData>{appt.email}</TableData>
                <TableData>{new Date(appt.date).toLocaleDateString()}</TableData>
                <TableData>{appt.time}</TableData>
                <TableData>{appt.services.join(', ')}</TableData>
                <TableData>{appt.requests}</TableData>
                <TableData>{appt.totalCost ? appt.totalCost.toFixed(2) : 'N/A'}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {/* Chart Section */}
      <GraphContainer>
        <h2>Service Booking Statistics</h2>
        <Bar data={chartData} />
      </GraphContainer>
    </Container>
  );
};

// Styled Components (add GraphContainer)
const GraphContainer = styled.div`
  margin-top: 40px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

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

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const DateLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: black;
`;

const DateInput = styled.input`
  width: 50%;
  padding: 8px;
  font-size: 14px;
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #222;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const SelectInput = styled.select`
  width: 50%;
  padding: 8px;
  font-size: 14px;
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #222;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

export default AllAppointments;
