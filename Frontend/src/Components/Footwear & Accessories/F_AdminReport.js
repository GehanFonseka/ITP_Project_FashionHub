import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation

// Styled components for the report table
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
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DownloadButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #4b3d24;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6f4f2f;
  }
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
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
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/report');
        setReportData(response.data);
        setFilteredData(response.data); // Initialize filtered data with full report
      } catch (error) {
        setError('Error fetching the report data.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    const filtered = reportData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemNo.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, reportData]);

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

  const groupedData = groupByItemNoPrefix(filteredData);

  // PDF Generation
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Footwear and Accessories Inventory Report', 10, 10);

    Object.keys(groupedData).forEach((category, idx) => {
      doc.text(`${category} Inventory`, 10, 20 + idx * 10);
      groupedData[category].forEach((item, index) => {
        doc.text(
          `${item.sellerNo}, ${item.itemNo}, ${item.name}, LKR ${item.price.toFixed(2)}, Qty: ${item.quantity}`,
          10,
          30 + (index + idx) * 10
        );
      });
    });

    doc.save('inventory_report.pdf');
  };

  return (
    <ReportContainer>
      <ReportTitle>Footwear and Accessories Inventory Report</ReportTitle>

      <SearchInput
        type="text"
        placeholder="Search by name or item number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <DownloadButton onClick={downloadPDF}>Download PDF</DownloadButton>

      {loading && <p>Loading report...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        Object.keys(groupedData).map((category) => (
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
                {groupedData[category].length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>No items available in this category.</TableCell>
                  </TableRow>
                ) : (
                  groupedData[category].map((item, index) => (
                    <TableRow key={index}>
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
    </ReportContainer>
  );
};

export default F_AdminReport;
