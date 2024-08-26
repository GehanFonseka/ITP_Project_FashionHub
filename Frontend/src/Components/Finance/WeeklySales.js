import React, { useState, useEffect } from 'react';
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
    marginBottom: '1rem',
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
  },
};

const WeeklySales = () => {
  const [store, setStore] = useState('saloon');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const sampleData = [
      { week: '2024-W01', revenue: 3000, expenses: 2000, profit: 1000, profitLossPercentage: 33.33 },
      { week: '2024-W02', revenue: 3500, expenses: 2500, profit: 1000, profitLossPercentage: 28.57 },
      { week: '2024-W03', revenue: 3200, expenses: 2200, profit: 1000, profitLossPercentage: 31.25 },
      { week: '2024-W04', revenue: 3300, expenses: 2400, profit: 900, profitLossPercentage: 27.27 },
      { week: '2024-W05', revenue: 3400, expenses: 2600, profit: 800, profitLossPercentage: 23.53 },
      { week: '2024-W06', revenue: 3100, expenses: 2300, profit: 800, profitLossPercentage: 25.81 },
      { week: '2024-W07', revenue: 2900, expenses: 2800, profit: 100, profitLossPercentage: 3.45 }, // Small profit
      { week: '2024-W08', revenue: 3000, expenses: 3200, profit: -200, profitLossPercentage: -6.67 }, // Loss data
      { week: '2024-W09', revenue: 2800, expenses: 3400, profit: -600, profitLossPercentage: -21.43 }, // Loss data
      { week: '2024-W10', revenue: 2700, expenses: 3500, profit: -800, profitLossPercentage: -29.63 }, // Loss data
    ];

    setSalesData(sampleData);
  }, [store]);

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleExport = () => {
    window.open(`/api/export-weekly-sales?store=${store}`);
  };

  return (
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Weekly Sales</h1>
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
              <th style={styles.tableHeader}>Week</th>
              <th style={styles.tableHeader}>Revenue (Rs.)</th>
              <th style={styles.tableHeader}>Expenses (Rs.)</th>
              <th style={styles.tableHeader}>Profit/Loss (Rs.)</th>
              <th style={styles.tableHeader}>Profit/Loss (%)</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data) => (
              <tr key={data.week}>
                <td style={styles.tableCell}>{data.week}</td>
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

export default WeeklySales;
