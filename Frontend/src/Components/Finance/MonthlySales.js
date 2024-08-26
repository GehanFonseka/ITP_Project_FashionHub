import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
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
  datePickerWrapper: {
    position: 'relative',
    width: '150px',  // Set fixed width for DatePicker wrapper
    
  },
  datePicker: {
    width: '100%',  // Make DatePicker take up the full width of the wrapper
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box',  // Include padding and border in width calculation
   
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

const MonthlySales = () => {
  const [store, setStore] = useState('saloon');
  const [selectedMonth, setSelectedMonth] = useState(null);  // Initialize as null
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Sample data
    const sampleData = [
      { month: '2024-01', revenue: 12000, expenses: 8000, profit: 4000, profitLossPercentage: 33.33 },
      { month: '2024-02', revenue: 15000, expenses: 9000, profit: 6000, profitLossPercentage: 40.00 },
      { month: '2024-03', revenue: 11000, expenses: 7000, profit: 4000, profitLossPercentage: 36.36 },
      // { month: '2024-04', revenue: 13000, expenses: 8500, profit: 4500, profitLossPercentage: 34.62 },
      // { month: '2024-05', revenue: 14000, expenses: 9500, profit: 4500, profitLossPercentage: 32.14 },
      // { month: '2024-06', revenue: 12500, expenses: 7500, profit: 5000, profitLossPercentage: 40.00 },
      // { month: '2024-07', revenue: 16000, expenses: 10000, profit: 6000, profitLossPercentage: 37.50 },
      // { month: '2024-08', revenue: 13500, expenses: 14500, profit: -1000, profitLossPercentage: -7.41 }, // Loss data with negative percentage
      // { month: '2024-09', revenue: 14500, expenses: 15500, profit: -1000, profitLossPercentage: -6.90 }, // Loss data with negative percentage
      // { month: '2024-10', revenue: 15500, expenses: 17000, profit: -1500, profitLossPercentage: -9.68 }, // Loss data with negative percentage
    ];

    // Filter data based on selected month and store
    const filteredData = selectedMonth
      ? sampleData.filter(data => format(new Date(data.month), 'yyyy-MM') === format(selectedMonth, 'yyyy-MM'))
      : sampleData;  // Show all data if no month is selected

    setSalesData(filteredData);
  }, [store, selectedMonth]);

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const handleExport = () => {
    const formattedMonth = selectedMonth ? format(selectedMonth, 'yyyy-MM') : 'all';
    window.open(`/api/export-monthly-sales?store=${store}&month=${formattedMonth}`);
  };

  return (
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Monthly Sales</h1>
      <header style={styles.header}>
        <select style={styles.storePicker} value={store} onChange={handleStoreChange}>
          <option value="saloon">Saloon</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
        </select>
        <div style={styles.datePickerWrapper}>
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select Month"
            style={styles.datePicker}
          />
        </div>
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
              <th style={styles.tableHeader}>Month</th>
              <th style={styles.tableHeader}>Revenue (Rs.)</th>
              <th style={styles.tableHeader}>Expenses (Rs.)</th>
              <th style={styles.tableHeader}>Profit/Loss (Rs.)</th>
              <th style={styles.tableHeader}>Profit/Loss (%)</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data) => (
              <tr key={data.month}>
                <td style={styles.tableCell}>{data.month}</td>
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

export default MonthlySales;
