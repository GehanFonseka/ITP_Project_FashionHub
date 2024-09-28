import React, { useEffect, useState } from 'react';

const FootwearReport = () => {
  // Data for Sneakers Inventory
  const sneakersInventory = [
    { sellerNo: '1', itemNo: '102', name: 'Chunky Sneakers', price: 325000, quantity: 16 },
    { sellerNo: '2', itemNo: '103', name: 'High-Top Sneakers', price: 32000, quantity: 13 },
    { sellerNo: '3', itemNo: '103', name: 'Vans Old Skool', price: 24000, quantity: 10 },
  ];

  // Data for Office Shoes Inventory
  const officeShoesInventory = [
    { sellerNo: '201', itemNo: '220', name: 'Loafers', price: 18000, quantity: 20 },
    { sellerNo: '702', itemNo: '506', name: 'Derby Shoes', price: 'Sissoo', quantity: 15 },
    { sellerNo: '784', itemNo: '325', name: 'Brogues', price: 1600, quantity: 10 },
  ];

  // Data for Boots Inventory
  const bootsInventory = [
    { sellerNo: '801', itemNo: '505', name: 'Ankle Boots', price: 26000, quantity: 8 },
    { sellerNo: '802', itemNo: '503', name: 'Knee-High Boot', price: 16000, quantity: 5 },
    { sellerNo: '803', itemNo: '504', name: 'Over-the-Knee Boots', price: 'Snooo', quantity: 12 },
  ];

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Footwear Item Report</h1>
      <h2 style={subHeaderStyle}>Footwear Report</h2>

      {/* Table 01: Sneakers Inventory */}
      <h3>Sneakers Inventory</h3>
      <InventoryTable data={sneakersInventory} />

      {/* Table 02: Office Shoes Inventory */}
      <h3>Office Shoes Inventory</h3>
      <InventoryTable data={officeShoesInventory} />

      {/* Table 03: Boots Inventory */}
      <h3>Boots Inventory</h3>
      <InventoryTable data={bootsInventory} />
    </div>
  );
};

// Reusable table component for displaying inventory
const InventoryTable = ({ data }) => (
  <div style={tableContainerStyle}>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Seller No</th>
          <th style={tableHeaderStyle}>Item No</th>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Price</th>
          <th style={tableHeaderStyle}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
            <td style={tableCellStyle}>{item.sellerNo}</td>
            <td style={tableCellStyle}>{item.itemNo}</td>
            <td style={tableCellStyle}>{item.name}</td>
            <td style={tableCellStyle}>
              {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
            </td>
            <td style={tableCellStyle}>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Inline styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '10px',
};

const subHeaderStyle = {
  textAlign: 'center',
  color: '#555',
  marginBottom: '30px',
};

const tableContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'center',
  border: '1px solid #ddd',
  backgroundColor: '#f4f4f4',
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9',
};

const oddRowStyle = {
  backgroundColor: '#fff',
};

export default FootwearReport;
