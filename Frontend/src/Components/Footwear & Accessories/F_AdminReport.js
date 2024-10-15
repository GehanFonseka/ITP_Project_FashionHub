import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF AutoTable

const ReportContainer = styled.div`
  padding: 20px;
  margin-top: 80px;
  background-color: #f5f5dc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReportTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #4b3d24;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #000000;
  background-color: #fff;

  &::placeholder {
    color: #888;
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: #a0522d;
  }
`;

const DownloadButton = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #4b3d24;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3d2b1e;
  }
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  text-align: left;
`;

const TableHead = styled.thead`
  background-color: #a0522d;
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  font-weight: bold;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const F_AdminReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/report/');
        setReportData(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Error fetching the report data: ${error.response.data.message}`);
        } else {
          setError("Error fetching the report data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const groupByItemNoPrefix = (data) => {
    return data.reduce((acc, item) => {
      const prefix = item.itemNo.toString().substring(0, 2);
      const categoryMapping = {
        '10': 'Sneakers',
        '20': 'Office Shoes',
        '30': 'Boots',
        '40': 'Chains and Bracelets',
      };

      const category = categoryMapping[prefix] || 'Others';
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByItemNoPrefix(reportData);

  const filteredData = Object.keys(groupedData).reduce((acc, category) => {
    const filteredItems = groupedData[category].filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems.length) {
      acc[category] = filteredItems;
    }

    return acc;
  }, {});

  const downloadPDF = () => {
    const pdf = new jsPDF();

    // Load and add the logo image
    const img = new Image();
    img.src = '/logo6.png'; // Adjust the path to your logo image

    img.onload = function() {
      const imgWidth = 45; // Set the width of the logo
      const imgHeight = 15; // Set the height of the logo
      const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image horizontally

      // Add the logo to the PDF
      pdf.addImage(img, 'PNG', xPos, 10, imgWidth, imgHeight);

      // Add the main title after the logo
      pdf.setFontSize(15);
      pdf.setTextColor(0, 0, 0); // Set text color to black
      pdf.text('Footwear and Accessories Inventory Report', 20, 40); // Position after the logo

      pdf.setFontSize(12);

      // Prepare data for autoTable
      const tableData = [];

      Object.keys(filteredData).forEach(category => {
        // Add category as a header row
        tableData.push([{ content: category, colSpan: 5, styles: { halign: 'center', fillColor: '#a0522d', textColor: '#fff', fontStyle: 'bold' } }]);

        filteredData[category].forEach(item => {
          const row = [
            item.sellerNo !== undefined ? item.sellerNo : 'N/A',
            item.itemNo !== undefined ? item.itemNo : 'N/A',
            item.name !== undefined ? item.name : 'N/A',
            item.price !== undefined ? `LKR ${item.price.toFixed(2)}` : 'N/A',
            item.quantity !== undefined ? item.quantity : 'N/A',
          ];
          tableData.push(row);
        });

        // Add a blank row after each category
        tableData.push(['', '', '', '', '']); // Empty row for spacing
      });

      // Define columns
      const columns = [
        { header: 'Seller No', dataKey: 'sellerNo' },
        { header: 'Item No', dataKey: 'itemNo' },
        { header: 'Name', dataKey: 'name' },
        { header: 'Price', dataKey: 'price' },
        { header: 'Quantity', dataKey: 'quantity' },
      ];

      // Generate the table using autoTable
      pdf.autoTable({
        head: [columns.map(col => col.header)],
        body: tableData,
        startY: 50, // Start after the title and logo
        styles: { overflow: 'linebreak' }, // Allow line breaks in cells
        columnStyles: {
          0: { cellWidth: 30 }, // Adjust column widths as needed
          1: { cellWidth: 30 },
          2: { cellWidth: 70 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
        },
      });

      // Save the PDF
      pdf.save('report.pdf');
    };
  };

  return (
    <ReportContainer>
      <ReportTitle>Footwear and Accessories Inventory Report</ReportTitle>

      <SearchInput
        type="text"
        placeholder="Search by item name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading report...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && Object.keys(filteredData).length === 0 && <p>No data available.</p>}

      {!loading && !error && Object.keys(filteredData).map((category) => (
        <div key={category}>
          <h3>{category} Inventory</h3>
          <ReportTable>
            <TableHead>
              <TableRow>
                <TableHeader>Seller No</TableHeader>
                <TableHeader>Item No</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Quantity</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData[category].length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No items available in this category.</TableCell>
                </TableRow>
              ) : (
                filteredData[category].map((item) => (
                  <TableRow key={item.itemNo}>
                    <TableCell>{item.sellerNo}</TableCell>
                    <TableCell>{item.itemNo}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>LKR {item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </ReportTable>
        </div>
      ))}

      <DownloadButton onClick={downloadPDF}>
        Download Report as PDF
      </DownloadButton>
    </ReportContainer>
  );
};

export default F_AdminReport;
