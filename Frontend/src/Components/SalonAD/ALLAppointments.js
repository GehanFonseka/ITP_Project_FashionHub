import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        const response = await axios.get('/api/services');
        setServiceCategories(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchAppointments();
    fetchServices();
  }, []);

  const filterAppointments = () => {
    return appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const matchesDateRange = (!start || apptDate >= start) && (!end || apptDate <= end);
      const matchesCategory = selectedCategory
        ? appt.services.some(service => getServiceCategory(service) === selectedCategory)
        : true;

      const matchesSearchTerm = searchTerm
        ? appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.email.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesDateRange && matchesCategory && matchesSearchTerm;
    });
  };
  const getServiceCategory = (service) => {
    const serviceCategories = {
      "Haircut": "Hair",
      "Hair Coloring": "Hair",
      "Hair Treatment": "Hair",
      "Hair Extension": "Hair",
      "Hair Blowout": "Hair",
      "Basic Facial": "Facial",
      "Anti-Aging Facial": "Facial",
      "Acne Treatment Facial": "Facial",
      "Brightening Facial": "Facial",
      "Body Scrub": "Facial",
      "Cellulite Treatment": "Facial",
      "Nail Art": "Nail",
      "Gel Manicure": "Nail",
      "Pedicure": "Nail",
      "Manicure": "Nail",
      "Tanning": "Makeup",
      "Basic Makeup Application": "Makeup",
      "Bridal Makeup": "Makeup",
      "Makeup Lesson": "Makeup",
      "Swedish Massage": "Massage",
      "Deep Tissue Massage": "Massage",
      "Hot Stone Massage": "Massage",
      "Aromatherapy Massage": "Massage",
    };
    return serviceCategories[service] || null;
  };


  const generateReport = () => {


    const serviceCounts = {};
    appointments.forEach((appt) => {
      appt.services.forEach((service) => {
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      });
    });


    const popularServices = Object.entries(serviceCounts)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count);

    const timeCounts = {};
    appointments.forEach((appt) => {
      const time = appt.time;
      timeCounts[time] = (timeCounts[time] || 0) + 1;
    });

    const peakTimes = Object.entries(timeCounts)
      .map(([time, count]) => ({ time, count }))
      .sort((a, b) => b.count - a.count);


    navigate('/report', { state: { popularServices, peakTimes } });
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Salon Appointments</Title>
        <ButtonContainer>

          <ReportButton onClick={generateReport}>Generate Report</ReportButton>
        </ButtonContainer>
      </TitleContainer>

      <FilterContainer>
        <FilterGroup>
          <DateLabel>Start Date:</DateLabel>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <DateLabel>End Date:</DateLabel>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
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
        </FilterGroup>
        <FilterGroup>
          <DateLabel>Search:</DateLabel>
          <SearchInput
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterGroup>
      </FilterContainer>

      {filterAppointments().length === 0 ? (
        <NoData>No appointments found.</NoData>
      ) : (
        <TableContainer>
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
                  <TableData>
                    {new Date(appt.date).toLocaleDateString()}
                  </TableData>
                  <TableData>{appt.time}</TableData>
                  <TableData>{appt.services.join(', ')}</TableData>
                  <TableData>{appt.requests}</TableData>
                  <TableData>
                    {appt.totalCost ? appt.totalCost.toFixed(2) : 'N/A'}
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AllAppointments;


const colors = {
  primary: '#2c3e50',
  secondary: '#ecf0f1',
  accent: '#e74c3c',
  text: '#2c3e50',
  background: '#ffffff',
  border: '#bdc3c7',
};

const fonts = {
  primary: "'Roboto', sans-serif",
  heading: "'Playfair Display', serif",
};

const Container = styled.div`
  max-width: 1500px;
  margin: 80px auto;
  background-color: ${colors.background};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: ${fonts.primary};
`;


const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;


const Title = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  color: ${colors.primary};
  font-family: ${fonts.heading};
`;


const DownloadButton = styled.button`
  background-color: ${colors.accent};
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: ${fonts.primary};
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;


const ReportButton = styled(DownloadButton)`
  background-color: #E76F51;

  &:hover {
    background-color: #2980b9;
  }
`;


const CloseButton = styled(DownloadButton)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
`;


const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;


const DateLabel = styled.label`
  margin-bottom: 8px;
  font-family: ${fonts.primary};
  font-size: 1rem;
  color: ${colors.text};
`;


const InputStyles = css`
  padding: 10px 14px;
  font-family: ${fonts.primary};
  font-size: 1rem;
  color: ${colors.text};
  border: 1px solid ${colors.border};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${colors.accent};
  }
`;


const DateInput = styled.input`
  ${InputStyles}
`;


const SelectInput = styled.select`
  ${InputStyles}
`;


const SearchInput = styled.input`
  ${InputStyles}
`;


const TableContainer = styled.div`
  overflow-x: auto;
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${fonts.primary};
  margin-bottom: 40px;
`;


const TableHeader = styled.th`
  background-color: ${colors.primary};
  color: #ffffff;
  padding: 16px;
  font-size: 1rem;
  text-align: left;
  border-bottom: 2px solid ${colors.secondary};
  font-family: 'Poppins', sans-serif;
`;


const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.secondary};
  }

  &:hover {
    background-color: #bdc3c7;
  }
`;


const TableData = styled.td`
  padding: 14px;
  border-bottom: 1px solid ${colors.secondary};
  font-family: ${fonts.primary};
  color: ${colors.text};
`;


const NoData = styled.p`
  text-align: center;
  font-family: ${fonts.primary};
  font-size: 1.1rem;
  color: ${colors.text};
  margin-top: 40px;
`;


const ReportContainer = styled.div`
  margin-top: 40px;
  background-color: ${colors.background};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const ReportTitle = styled.h3`
  font-size: 1.8rem;
  color: ${colors.primary};
  font-family: ${fonts.heading};
  margin-bottom: 20px;
`;


const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${fonts.primary};
  margin-bottom: 30px;
`;


const ReportTableHeader = styled.th`
  background-color: ${colors.primary};
  color: #ffffff;
  padding: 12px;
  font-size: 1rem;
  text-align: left;
  border-bottom: 2px solid ${colors.secondary};
`;


const ReportTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.secondary};
  }

  &:hover {
    background-color: #bdc3c7;
  }
`;


const ReportTableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${colors.secondary};
  font-family: ${fonts.primary};
  color: ${colors.text};
`;
