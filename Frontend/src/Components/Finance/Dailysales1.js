import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '1rem',
    backgroundColor: '#f0f2f5',
    marginTop: '80px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#282c34',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: '1rem',
    borderRadius: '8px',
    color: 'white',
  },
  storePicker: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
  },
  exportButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#97b2cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  exportButtonHover: {
    backgroundColor: '#0056b3',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  salesTable: {
    width: '70%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#97b2cc',
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    fontSize: '20px',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    fontSize: '18px',
  },
};

const DailySalesPage = () => {
  const [store, setStore] = useState('saloon');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const sampleData = [
      { date: '2024-08-01', revenue: 1200, expenses: 800, profit: 400, profitLossPercentage: 33.33 },
      { date: '2024-08-02', revenue: 1500, expenses: 900, profit: 600, profitLossPercentage: 40.00 },
      { date: '2024-08-03', revenue: 1100, expenses: 1200, profit: -100, profitLossPercentage: -9.09 },
      { date: '2024-08-04', revenue: 1300, expenses: 1350, profit: -50, profitLossPercentage: -3.85 },
      { date: '2024-08-05', revenue: 1400, expenses: 950, profit: 450, profitLossPercentage: 32.14 },
      { date: '2024-08-06', revenue: 1250, expenses: 1450, profit: -200, profitLossPercentage: -13.79 },
      { date: '2024-08-07', revenue: 1600, expenses: 1000, profit: 600, profitLossPercentage: 37.50 },
      { date: '2024-08-08', revenue: 1350, expenses: 1450, profit: -100, profitLossPercentage: -7.41 },
      { date: '2024-08-09', revenue: 1450, expenses: 1500, profit: -50, profitLossPercentage: -3.33 },
      { date: '2024-08-10', revenue: 1550, expenses: 1000, profit: 550, profitLossPercentage: 35.48 },
    ];

    // Update sales data with currency as Rs.
    const updatedSalesData = sampleData.map((data) => ({
      ...data,
      revenue: `Rs. ${data.revenue}`,
      expenses: `Rs. ${data.expenses}`,
      profit: `Rs. ${data.profit}`,
    }));

    setSalesData(updatedSalesData);
  }, [store]);

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleExport = () => {
    window.open(`/api/export-daily-sales?store=${store}`);
  };

  return (
    <div style={styles.container}>
      <SideBar/>
      <h1 style={styles.title}>Daily Sales</h1>
      <header style={styles.header}>
        <select style={styles.storePicker} value={store} onChange={handleStoreChange}>
          <option value="saloon">Saloon</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
        </select>
        <button
          style={styles.exportButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.exportButtonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.exportButton.backgroundColor}
          onClick={handleExport}
        >
          Export Report
        </button>
      </header>
      <main style={styles.mainContent}>
        <table style={styles.salesTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Revenue</th>
              <th style={styles.tableHeader}>Expenses</th>
              <th style={styles.tableHeader}>Profit/Loss</th>
              <th style={styles.tableHeader}>Profit/Loss (%)</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data) => (
              <tr key={data.date}>
                <td style={styles.tableCell}>{data.date}</td>
                <td style={styles.tableCell}>{data.revenue}</td>
                <td style={styles.tableCell}>{data.expenses}</td>
                <td style={styles.tableCell}>{data.profit}</td>
                <td style={styles.tableCell}>{data.profitLossPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DailySalesPage;
