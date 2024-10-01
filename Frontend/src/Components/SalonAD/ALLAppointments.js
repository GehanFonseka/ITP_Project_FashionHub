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
    const imgWidth = 30;
    const imgHeight = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgX = pageWidth - imgWidth - 10;
    const imgY = 10;

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
      });
    };

    loadImage(logo).then((img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL('image/png');

      doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
      doc.setFont('Times', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(128, 0, 32);
      doc.text('FASHIONHUB - Salon Appointments Report', 14, imgY + imgHeight + 10);

      doc.autoTable({
        startY: imgY + imgHeight + 20,
        head: [['Name', 'Contact Number', 'Email', 'Date', 'Time', 'Services', 'Special Requests', 'Total Amount (LKR)']],
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
          font: 'helvetica',
          textColor: [54, 69, 79],
          fontSize: 8,
        },
        headStyles: {
          font: 'courier',
          fontStyle: 'bold',
          fontSize: 10,
          fillColor: [201, 162, 92],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [245, 245, 220],
        },
      });

      doc.save('appointments_report.pdf');
    });
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
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DateLabel>End Date:</DateLabel>
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
   margin-bottom: 30px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #002d62;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const DateLabel = styled.label`
  margin-right: 10px;
`;

const DateInput = styled.input`
  margin-right: 20px;
`;

const SelectInput = styled.select`
  margin-right: 20px;
  height:46px;
  margin-bottom:18px;
`;

const SearchInput = styled.input`
  padding: 5px;
  width: 200px;
  margin-top:3px;
`;

const DownloadButton = styled.button`
  background-color: #E76F51;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #001f3f;
  color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

export default AllAppointments;
