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
  searchInput: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsTable: {
    width: '80%',
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

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    // Sample transaction data
    const sampleData = [
      { username: 'JohnDoe', date: '2024-08-01', numProducts: 3, totalPrice: 'Rs. 150' },
      { username: 'JaneSmith', date: '2024-08-02', numProducts: 2, totalPrice: 'Rs. 200' },
      { username: 'AliceBrown', date: '2024-08-03', numProducts: 1, totalPrice: 'Rs. 90' },
      { username: 'BobGreen', date: '2024-08-04', numProducts: 4, totalPrice: 'Rs. 300' },
      { username: 'CharlieWhite', date: '2024-08-05', numProducts: 5, totalPrice: 'Rs. 500' },
      { username: 'DaisyBlue', date: '2024-08-06', numProducts: 2, totalPrice: 'Rs. 120' },
      { username: 'EdwardBlack', date: '2024-08-07', numProducts: 3, totalPrice: 'Rs. 180' },
      { username: 'FionaGray', date: '2024-08-08', numProducts: 4, totalPrice: 'Rs. 250' },
      { username: 'GeorgePink', date: '2024-08-09', numProducts: 1, totalPrice: 'Rs. 80' },
      { username: 'HannahPurple', date: '2024-08-10', numProducts: 6, totalPrice: 'Rs. 600' },
    ];

    setTransactionsData(sampleData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = transactionsData.filter(transaction =>
    transaction.username.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Transactions</h1>
      <header style={styles.header}>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </header>
      <main style={styles.mainContent}>
        <table style={styles.transactionsTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Username</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>No. of Products/Services</th>
              <th style={styles.tableHeader}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((transaction, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{transaction.username}</td>
                <td style={styles.tableCell}>{transaction.date}</td>
                <td style={styles.tableCell}>{transaction.numProducts}</td>
                <td style={styles.tableCell}>{transaction.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Transactions;
