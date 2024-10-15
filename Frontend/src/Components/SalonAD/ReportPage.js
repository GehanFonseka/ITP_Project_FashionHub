import React from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access the report data passed via state
    const { popularServices, peakTimes } = location.state || {};

    if (!popularServices || !peakTimes) {
        return (
            <ReportContainer>
                <ReportTitle>No Report Data Available</ReportTitle>
                <CloseButton onClick={() => navigate(-1)}>Go Back</CloseButton>
            </ReportContainer>
        );
    }

    const generateReportPDF = () => {
        const doc = new jsPDF();


        const img = new Image();
        img.src = '/logo6.png';

        img.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgWidth = 40;
            const imgHeight = 15;
            const xPosition = (pageWidth - imgWidth) / 2;


            const currentDate = new Date().toLocaleDateString();
            const currentTime = new Date().toLocaleTimeString();


            doc.setFontSize(10);
            doc.text(`Date: ${currentDate} | Time: ${currentTime}`, pageWidth - 20, 10, { align: 'right' });


            doc.addImage(img, 'PNG', xPosition, 10, imgWidth, imgHeight);


            doc.setFontSize(16);
            doc.text('Most Popular Services Report', pageWidth / 2, 40, { align: 'center' });


            doc.autoTable({
                startY: 50,
                margin: { left: 14, right: 14 },
                head: [['Service', 'Number of Bookings']],
                body: popularServices.map((service) => [service.service, service.count]),
                styles: {
                    halign: 'center',
                    fontSize: 10,
                    cellPadding: 4
                },
                headStyles: {
                    fillColor: '#8b0000',
                    textColor: '#ffffff',
                    halign: 'center',
                    fontSize: 11,
                },
            });


            doc.addPage();


            doc.setFontSize(10);
            doc.text(`Date: ${currentDate} | Time: ${currentTime}`, pageWidth - 20, 10, { align: 'right' });


            doc.setFontSize(16);
            doc.text('Peak Times Report', pageWidth / 2, 40, { align: 'center' });


            doc.autoTable({
                startY: 50,
                margin: { left: 14, right: 14 },
                head: [['Time', 'Number of Bookings']],
                body: peakTimes.map((time) => [time.time, time.count]),
                styles: {
                    halign: 'center',
                    fontSize: 10,
                    cellPadding: 4,
                },
                headStyles: {
                    fillColor: '#8b0000',
                    textColor: '#ffffff',
                    halign: 'center',
                    fontSize: 11,
                },
            });


            doc.save('report.pdf');
        };
    };





    return (
        <ReportContainer>
            <ReportTitle>Most Popular Services</ReportTitle>
            <ReportTable>
                <thead>
                    <tr>
                        <ReportTableHeader>Service</ReportTableHeader>
                        <ReportTableHeader>Number of Bookings</ReportTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {popularServices.map((service, index) => (
                        <ReportTableRow key={index}>
                            <ReportTableData>{service.service}</ReportTableData>
                            <ReportTableData>{service.count}</ReportTableData>
                        </ReportTableRow>
                    ))}
                </tbody>
            </ReportTable>

            <ReportTitle>Peak Times</ReportTitle>
            <ReportTable>
                <thead>
                    <tr>
                        <ReportTableHeader>Time</ReportTableHeader>
                        <ReportTableHeader>Number of Bookings</ReportTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {peakTimes.map((time, index) => (
                        <ReportTableRow key={index}>
                            <ReportTableData>{time.time}</ReportTableData>
                            <ReportTableData>{time.count}</ReportTableData>
                        </ReportTableRow>
                    ))}
                </tbody>
            </ReportTable>

            <ButtonContainer>
                <CloseButton onClick={() => navigate(-1)}>Back to Appointments</CloseButton>
                <DownloadButton onClick={generateReportPDF}>Download Report PDF</DownloadButton>
            </ButtonContainer>
        </ReportContainer>
    );
};

export default ReportPage;



const colors = {
    primary: ' #AE2012',
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



const ReportContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  background-color: ${colors.background};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: ${fonts.primary};
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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

const CloseButton = styled(DownloadButton)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
  }
`;
