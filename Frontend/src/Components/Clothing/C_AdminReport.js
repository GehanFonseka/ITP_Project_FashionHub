import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #343a40;
  font-size: 24px;
  margin-bottom: 20px;
`;

const NoData = styled.p`
  text-align: center;
  color: #6c757d;
  font-size: 18px;
`;

const CategorySection = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h3`
  font-size: 20px;
  color: #495057;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const DownloadButton = styled.button`
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const C_AdminReport = () => {
  const [clothingData, setClothingData] = useState([]);

  useEffect(() => {
    const fetchClothingData = async () => {
      try {
        const response = await axios.get('/api/clothing/clothing-stats');
        setClothingData(response.data);
      } catch (error) {
        console.error('Error fetching clothing data:', error);
      }
    };

    fetchClothingData();
  }, []);

  const downloadReportAsPDF = () => {
    const doc = new jsPDF();
    let yPos = 20; // Initial y position for content

    clothingData.forEach((categoryData, index) => {
      // Add the category title with a margin
      doc.setFontSize(14);
      doc.text(`Category: ${categoryData.category}`, 20, yPos);
      yPos += 10; // Move down to create space between title and table

      // Prepare the table data
      const tableData = categoryData.items.map((item) => [
        item.name,
        `LKR${item.price.toFixed(2)}`,
        item.sellerNo,
        item.itemNo,
        item.quantity,
      ]);

      // Add the table
      doc.autoTable({
        startY: yPos, // Set the starting y position for the table
        head: [['Name', 'Price', 'Seller No', 'Item No', 'Quantity']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [0, 123, 255] }, // Blue header background
        margin: { left: 20 }, // Left margin
        didDrawPage: (data) => {
          yPos = data.cursor.y + 10; // Update y position for the next category
        },
      });
    });

    // Save the generated PDF
    doc.save('Clothing_Report.pdf');
  };

  return (
    <Container>
      <Title>Clothing Items Report</Title>
      {clothingData.length === 0 ? (
        <NoData>No clothing items available.</NoData>
      ) : (
        <>
          {clothingData.map((categoryData, index) => (
            <CategorySection key={index}>
              <CategoryTitle>{categoryData.category}</CategoryTitle>
              <ReportTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Seller No</th>
                    <th>Item No</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>LKR{item.price.toFixed(2)}</td>
                      <td>{item.sellerNo}</td>
                      <td>{item.itemNo}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </ReportTable>
            </CategorySection>
          ))}
          <DownloadButton onClick={downloadReportAsPDF}>Download Report as PDF</DownloadButton>
        </>
      )}
    </Container>
  );
};

export default C_AdminReport;
