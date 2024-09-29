import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the report table
const ReportContainer = styled.div`
  padding: 20px;
  margin-top: 80px;
  background-color: #f5f5dc; /* Light brown background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const ReportTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem; /* Slightly larger font size */
  color: #4b3d24; /* Darker brown color for title */
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  text-align: left;
  border-radius: 8px; /* Rounded corners */
  overflow: hidden; /* Prevents overflow from the table */
`;

const TableHead = styled.thead`
  background-color: #a0522d; /* Light brown header */
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 12px; /* Increased padding for better spacing */
  border: 1px solid #ddd;
  font-weight: bold; /* Bold font for headers */
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Light grey for even rows */
  }
  &:hover {
    background-color: #e0e0e0; /* Light grey on hover */
  }
`;

const TableCell = styled.td`
  padding: 12px; /* Increased padding for better spacing */
  border: 1px solid #ddd;
`;

// FootwearReport component
const F_AdminReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch report data from the API
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/report');
        setReportData(response.data);
      } catch (error) {
        setError("Error fetching the report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Function to group items by itemNo starting digits (e.g., 10 for Sneakers, 30 for Boots)
  const groupByItemNoPrefix = (data) => {
    return data.reduce((acc, item) => {
      // Extract prefix based on the first two digits of itemNo
      const prefix = item.itemNo.toString().substring(0, 2);

      // Map prefixes to category names
      const categoryMapping = {
        '10': 'Sneakers',
        '20': 'Office Shoes',
        '30': 'Boots',
        '40': 'Chains and Bracelets',
      };

      // Get the category name using the prefix
      const category = categoryMapping[prefix] || 'Others';

      // Create a new category array if it doesn't exist
      if (!acc[category]) {
        acc[category] = [];
      }

      // Add item to the appropriate category
      acc[category].push(item);
      return acc;
    }, {});
  };

  // Grouped data based on itemNo starting digits
  const groupedData = groupByItemNoPrefix(reportData);

  return (
    <ReportContainer>
      <ReportTitle>Footwear and Accessories Inventory Report</ReportTitle>

      {/* Handle loading state */}
      {loading && <p>Loading report...</p>}

      {/* Handle error state */}
      {error && <p>{error}</p>}

      {/* Display the report tables */}
      {!loading && !error && Object.keys(groupedData).map((category) => (
        <div key={category}>
          <h3>{category} Inventory</h3> {/* Category heading */}
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
                    <TableCell>lkr{item.price.toFixed(2)}</TableCell> {/* Format price */}
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
