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
  margin-top: 75px;
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

const SearchInput = styled.input`
  padding: 10px;
  width: calc(100% - 22px);
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 5px;
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
    background-color: #8b0000;
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
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #B22222;
  }
`;

const C_AdminReport = () => {
  const [clothingData, setClothingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchClothingData = async () => {
      try {
        const response = await axios.get('/api/clothing/clothing-stats');
        setClothingData(response.data);
        setFilteredData(response.data); // Set initial filtered data
      } catch (error) {
        console.error('Error fetching clothing data:', error);
      }
    };

    fetchClothingData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter clothing data based on search query
    const filtered = clothingData.flatMap(categoryData => ({
      category: categoryData.category,
      items: categoryData.items.filter(item =>
        item.name.toLowerCase().includes(query) || item.itemNo.toString().includes(query)
      )
    })).filter(category => category.items.length > 0); // Remove empty categories

    setFilteredData(filtered);
  };

  const downloadReportAsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Load the logo from the public folder and convert it to base64
    const img = new Image();
    img.src = '/logo6.png'; // Make sure this is the correct path
    img.onload = function() {
      const imgWidth = 45; // Adjusted width of the image
      const imgHeight = 15; // Adjusted height of the image
      const xPos = (pageWidth - imgWidth) / 2; // Center the image horizontally

      doc.addImage(img, 'PNG', xPos, 10, imgWidth, imgHeight); // Adjust position and size

      let yPos = 50; // Adjusted y position for content

      // Now that the logo is added, generate the PDF content
      filteredData.forEach((categoryData, index) => {
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
          headStyles: { fillColor: [139, 0, 0] }, // Dark red header background (#8B0000)
          margin: { left: 20 }, // Left margin
          didDrawPage: (data) => {
            yPos = data.cursor.y + 10; // Update y position for the next category
          },
        });
      });

      // Save the generated PDF
      doc.save('Clothing_Report.pdf');
    };
  };

  return (
    <Container>
      <Title>Clothing Items Report</Title>
      <SearchInput
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by Name or Item No"
      />
      {filteredData.length === 0 ? (
        <NoData>No clothing items available.</NoData>
      ) : (
        <>
          {filteredData.map((categoryData, index) => (
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
