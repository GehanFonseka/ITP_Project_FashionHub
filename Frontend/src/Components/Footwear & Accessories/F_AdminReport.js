import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import styled from 'styled-components';

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 10px;
  text-align: left;
  background-color: #f8f8f8;
`;

const TableData = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const F_AdminReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('/api/report');
      console.log("Report data fetched:", response.data);
      if (Array.isArray(response.data)) {
        setReportData(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <ReportContainer>
      <h2>Footwear Report</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Seller No</TableHeader>
            <TableHeader>Item No</TableHeader>
            <TableHeader>Name</TableHeader> {/* Added Name */}
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((item, index) => (
              <tr key={index}>
                <TableData>{item.sellerNo}</TableData>
                <TableData>{item.itemNo}</TableData>
                <TableData>{item.name}</TableData> {/* Added Name */}
                <TableData>${item.price}</TableData>
                <TableData>{item.quantity}</TableData>
              </tr>
            ))
          ) : (
            <tr>
              <TableData colSpan="5" style={{ textAlign: 'center' }}>No data available</TableData>
            </tr>
          )}
        </tbody>
      </Table>
    </ReportContainer>
  );
};

export default F_AdminReport;
