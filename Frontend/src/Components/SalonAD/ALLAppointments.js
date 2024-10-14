import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/Logo6.png';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [serviceStats, setServiceStats] = useState({});
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

    const fetchServiceStats = async () => {
      try {
        const response = await axios.get('/api/service-stats', {
          params: { startDate, endDate },
        });
        setServiceStats(response.data);
      } catch (error) {
        console.error('Error fetching service stats:', error);
      }
    };

    fetchAppointments();
    fetchServices();
    fetchServiceStats();
  }, [startDate, endDate]);

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

  const generatePDF = () => {
    const doc = new jsPDF();
    const imgWidth = 40;  // Adjusted width for the logo
    const imgHeight = 15;  // Adjusted height for the logo
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - imgWidth) / 2;  // Center the logo horizontally

    const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here

    doc.addImage(logo, 'PNG', centerX, 20, imgWidth, imgHeight);

    doc.setFont('Times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(128, 0, 32);
    doc.text('FashionHub - Salon Appointments Report', 40, 60);

    doc.autoTable({
      startY: 80,
      theme: "striped",
      head: [['Name', 'Contact Number', 'Date', 'Time', 'Services', 'Total Amount (LKR)']],
      body: filterAppointments().map((appt) => [
        appt.name,
        appt.contactNumber,
        appt.email,
        new Date(appt.date).toLocaleDateString(),
        appt.time,
        appt.services.join(', '),
        appt.requests,
        appt.totalCost ? appt.totalCost.toFixed(0) : 'N/A',
      ]),
      styles: {
        font: 'Saira',
        textColor: [54, 69, 79],
        fontSize: 10,
      },
      headStyles: {
        font: 'Saira',
        fontStyle: 'bold',
        fontSize: 8,
        fillColor: [139, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('appointments_report.pdf');
  };


  return (
    <Container>
      <TitleContainer>
        <Title><b>Salon Appointments</b></Title>
        <DownloadButton onClick={generatePDF}>Download PDF</DownloadButton>
      </TitleContainer>

      <FilterContainer>
        <DateLabel>Start Date:</DateLabel>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const minStartDate = new Date("2024-08-31"); // Set the minimum start date to August 31, 2024
            if (selectedDate > minStartDate) {
              setStartDate(e.target.value);
            } else {
              alert("Start date must be after August 31, 2024");
            }
          }}
        />
        <DateLabel>End Date:</DateLabel>
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const maxEndDate = new Date("2025-12-31"); // Set the maximum end date to December 31, 2025
            if (selectedDate <= maxEndDate) {
              setEndDate(e.target.value);
            } else {
              alert("End date cannot exceed December 31, 2025");
            }
          }}
        />
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
        <SearchInput
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
    </Container>
  );
};
const Container = styled.div`
  margin: 80px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 120px;
  font-family: 'Roboto', sans-serif; /* Set body font */
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 34px;
  color:  #ae2012;
  font-family: 'Playfair Display', serif; /* Set title font */
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const DateLabel = styled.label`
  margin-right: 10px;
  font-family: 'Roboto', sans-serif; /* Set label font */
`;

const DateInput = styled.input`
  margin-right: 20px;
  font-family: 'Roboto', sans-serif; /* Set input font */
`;

const SelectInput = styled.select`
  margin-right: 20px;
  height: 46px;
  margin-bottom: 18px;
  font-family: 'Roboto', sans-serif; /* Set select font */
`;

const SearchInput = styled.input`
  padding: 5px;
  width: 200px;
  margin-top: 3px;
  font-family: 'Roboto', sans-serif; /* Set search input font */
`;

const DownloadButton = styled.button`
  background-color:  #ae2012;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Lato', sans-serif; /* Set button font */
  margin-bottom:30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif; /* Set table font */
`;

const TableHeader = styled.th`
  background-color: #001f3f;
  color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Poppins', sans-serif; /* Set table header font */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Roboto', sans-serif; /* Set table data font */
`;

export default AllAppointments;
