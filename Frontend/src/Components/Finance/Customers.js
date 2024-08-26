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
  customersTable: {
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

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    // Sample customer data
    const sampleData = [
      { name: 'Kavishka', email: 'Kavishka@example.com', phone: '0779867546' },
      { name: 'Omash', email: 'Omash@example.com', phone: '0342345633' },

    ];

    setCustomersData(sampleData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Customers</h1>
      <header style={styles.header}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </header>
      <main style={styles.mainContent}>
        <table style={styles.customersTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{customer.name}</td>
                <td style={styles.tableCell}>{customer.email}</td>
                <td style={styles.tableCell}>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Customers;
