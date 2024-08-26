import React, { useState } from 'react';
import SideBar from './SideBar';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    height: '100vh',
    marginTop: '80px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#282c34',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack inputs vertically
    alignItems: 'center',
    marginBottom: '1rem',
    marginTop: '40px',
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'row', // Align input groups horizontally
    justifyContent: 'space-between', // Space between input groups
    width: '100%', // Full width to align items properly
    maxWidth: '800px', // Optional: max width for the container
    marginTop: '1rem', // Space from the previous section
  },
  labelInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 1rem', // Space between input groups
  },
  label: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    marginTop: '20px',  
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'right',
    width: '100%', // Full width of the container
    maxWidth: '150px', // Optional: set a maximum width for inputs
  },
  table: {
    width: '80%',
    marginTop: '2rem',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#97b2cc',
    padding: '0.5rem',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontSize: '20px',
  },
  tableCell: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#97b2cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const Salaries = () => {
  const [totalProfit, setTotalProfit] = useState(100000); // Set your total monthly profit here
  const [clothingProfit, setClothingProfit] = useState(0);
  const [saloonProfit, setSaloonProfit] = useState(0);
  const [footwearProfit, setFootwearProfit] = useState(0);
  const [shoesProfit, setShoesProfit] = useState(0);

  const calculatePercentage = (profit) => {
    return ((profit / totalProfit) * 100).toFixed(2);
  };

  const handleDistribute = () => {
    const totalAllocated = clothingProfit + saloonProfit + footwearProfit + shoesProfit;
    if (totalAllocated !== totalProfit) {
      alert(`Total allocated profit (${totalAllocated}) does not match the total profit (${totalProfit}). Please adjust the values.`);
    } else {
      alert('Profit distributed successfully!');
    }
  };

  return (
    
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Monthly Profit Distribution</h1>
      <div style={styles.inputContainer}>
        <div style={styles.label}>Total Monthly Profit: Rs. {totalProfit}</div>
        <div style={styles.inputsWrapper}>
          <div style={styles.labelInputWrapper}>
            <label style={styles.label}>Clothing</label>
            <input
              type="number"
              value={clothingProfit}
              onChange={(e) => setClothingProfit(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.labelInputWrapper}>
            <label style={styles.label}>Saloon</label>
            <input
              type="number"
              value={saloonProfit}
              onChange={(e) => setSaloonProfit(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.labelInputWrapper}>
            <label style={styles.label}>Footwear</label>
            <input
              type="number"
              value={footwearProfit}
              onChange={(e) => setFootwearProfit(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.labelInputWrapper}>
            <label style={styles.label}>Shoes</label>
            <input
              type="number"
              value={shoesProfit}
              onChange={(e) => setShoesProfit(Number(e.target.value))}
              style={styles.input}
            />
          </div>
        </div>
        <button style={styles.button} onClick={handleDistribute}>Distribute Profit</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Store</th>
            <th style={styles.tableHeader}>Allocated Profit (Rs.)</th>
            <th style={styles.tableHeader}>Percentage of Total Profit (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}>Clothing</td>
            <td style={styles.tableCell}>{clothingProfit}</td>
            <td style={styles.tableCell}>{calculatePercentage(clothingProfit)}%</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Saloon</td>
            <td style={styles.tableCell}>{saloonProfit}</td>
            <td style={styles.tableCell}>{calculatePercentage(saloonProfit)}%</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Footwear</td>
            <td style={styles.tableCell}>{footwearProfit}</td>
            <td style={styles.tableCell}>{calculatePercentage(footwearProfit)}%</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Shoes</td>
            <td style={styles.tableCell}>{shoesProfit}</td>
            <td style={styles.tableCell}>{calculatePercentage(shoesProfit)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Salaries;
