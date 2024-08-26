import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import SideBar from './SideBar';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    height: '130vh',
    marginTop: '80px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#282c34',
  },
  pickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  picker: {
    margin: '0 10px',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  chartContainer: {
    width: '50%', // Adjust the width to control the size of the chart
    height: '50%', // Adjust the height to control the size of the chart
  },
};

const BreakDown = () => {
  const [timePeriod, setTimePeriod] = useState('daily');

  const salesData = {
    daily: [5000, 3000, 2000, 1000],
    weekly: [35000, 25000, 15000, 7000],
    monthly: [150000, 100000, 70000, 50000],
  };

  const chartData = {
    labels: ['Clothing', 'Accessories', 'Saloon', 'Shoes'],
    datasets: [
      {
        data: salesData[timePeriod],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // Disable maintaining aspect ratio
  };

  return (
    <div style={styles.container}>
        <SideBar/>
      <h1 style={styles.title}>Sales Breakdown</h1>
      <div style={styles.pickerContainer}>
        <select
          style={styles.picker}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div style={styles.chartContainer}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BreakDown;
