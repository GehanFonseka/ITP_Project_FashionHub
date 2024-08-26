import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Saloon', 'Clothing', 'Footwear', 'Accessories'],
  datasets: [
    {
      label: '# of Sales',
      data: [12, 19, 3, 5], // Replace with your data
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  plugins: {
    title: {
      display: true,
      text: 'Sales Breakdown',
      font: {
        size: 20, // Adjust the title size
      },
    },
    legend: {
      labels: {
        color: 'white', // Change the labels color to white
       
      },
    },
  },
};


const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    
    <div className="dashboardContainer">
     
      <div className="metricsContainer">
      <SideBar />
        <div className="metric" onClick={() => handleNavigate('/Customers')}>
          <h3 className="metricTitle">Total Customers</h3>
          <p className="metricValue">1000</p>
          <p className="metricChange">+5% from last month</p>
        </div>
        <div className="metric" onClick={() => handleNavigate('/Dailysales1')}>
          <h3 className="metricTitle">Today’s Sales</h3>
          <p className="metricValue">Rs. 1500</p>
          <p className="metricChange">+3% from yesterday</p>
        </div>
        <div className="metric" onClick={() => handleNavigate('/WeeklySales')}>
          <h3 className="metricTitle">Weekly Sales</h3>
          <p className="metricValue">Rs. 10,000</p>
          <p className="metricChange">-2% from last week</p>
        </div>
        <div className="metric" onClick={() => handleNavigate('/MonthlySales')}>
          <h3 className="metricTitle">Monthly Sales</h3>
          <p className="metricValue">Rs. 40,000</p>
          <p className="metricChange">+4% from last month</p>
        </div>
      </div>
      <div className="contentContainer">
        <table className="transactionsTable">
          <thead>
            <tr>
              <th className="tableHeader">Username</th>
              <th className="tableHeader">Date</th>
              <th className="tableHeader">No. of Products</th>
              <th className="tableHeader">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tableRow">
              <td className="tableCell">JohnDoe</td>
              <td className="tableCell">2024-08-01</td>
              <td className="tableCell">3</td>
              <td className="tableCell">Rs. 150</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">JaneSmith</td>
              <td className="tableCell">2024-08-02</td>
              <td className="tableCell">2</td>
              <td className="tableCell">Rs. 200</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">AliceBrown</td>
              <td className="tableCell">2024-08-03</td>
              <td className="tableCell">1</td>
              <td className="tableCell">Rs. 90</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">BobGreen</td>
              <td className="tableCell">2024-08-04</td>
              <td className="tableCell">4</td>
              <td className="tableCell">Rs. 300</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">CharlieWhite</td>
              <td className="tableCell">2024-08-05</td>
              <td className="tableCell">5</td>
              <td className="tableCell">Rs. 500</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">DaisyBlue</td>
              <td className="tableCell">2024-08-06</td>
              <td className="tableCell">2</td>
              <td className="tableCell">Rs. 120</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">EdwardBlack</td>
              <td className="tableCell">2024-08-07</td>
              <td className="tableCell">3</td>
              <td className="tableCell">Rs. 180</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">FionaGray</td>
              <td className="tableCell">2024-08-08</td>
              <td className="tableCell">4</td>
              <td className="tableCell">Rs. 250</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">GeorgePink</td>
              <td className="tableCell">2024-08-09</td>
              <td className="tableCell">1</td>
              <td className="tableCell">Rs. 80</td>
            </tr>
            <tr className="tableRow">
              <td className="tableCell">HannahPurple</td>
              <td className="tableCell">2024-08-10</td>
              <td className="tableCell">6</td>
              <td className="tableCell">Rs. 600</td>
            </tr>
          </tbody>
        </table>
        <div className="pieChartContainer">
          <Pie data={data} options={options} className="pieChart" />
        </div>
      </div>
      {/* CSS styles */}
      <style>{`
        .dashboardContainer {
          margin-top: 80px;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          background-color: #f0f2f5;
          height: 100vh;
          overflow: auto;
        }
        .metricsContainer {
          display: grid;
          grid-template-columns: repeat(2, 0.3fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .metric {
          background-color: #282c34;
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s;
          min-height: 60px;
        }
        .metricTitle {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
        }
        .metricValue {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
        }
        .metricChange {
          font-size: 1rem;
        }
        .contentContainer {
          display: flex;
          flex-direction: row;
          gap: 2rem;
        }
        .transactionsTable {
          width: 1000px;
          border-collapse: collapse;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid #ddd;
        }
        .tableHeader {
          background-color: #282c34;
          color: white;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #ddd;
          font-size: 19px;
        }
        .tableRow {
          border-bottom: 2px solid #ddd;
        }
        .tableCell {
          padding: 10px;
          border-bottom: 2px solid #ddd;
          text-align: left;
        }
        .pieChartContainer {
          width: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #797c80;
          padding: 0.2rem;
          border-radius: 8px;
          margin-top: -300px;
          margin-bottom: 200px;
        }
        .pieChart {
          width: 100%;
          height: 100%;
          max-width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
