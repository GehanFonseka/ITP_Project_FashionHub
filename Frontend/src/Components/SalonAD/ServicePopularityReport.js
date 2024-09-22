import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import fileDownload from 'js-file-download';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ServicePopularityReport = () => {
  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicePopularity = async () => {
      try {
        const response = await axios.get('/api/services/service-popularity');
        setServiceData(response.data);
      } catch (error) {
        console.error('Error fetching service popularity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicePopularity();
  }, []);

  const generateReport = () => {
    const reportData = JSON.stringify(serviceData, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    fileDownload(blob, 'service_popularity_report.json');
  };

  const chartData = {
    labels: Object.keys(serviceData),
    datasets: [
      {
        label: 'Number of Bookings',
        data: Object.values(serviceData),
        backgroundColor: 'rgba(74, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Service Popularity Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Bar data={chartData} options={{ responsive: true }} />
          <button onClick={generateReport}>Download Report</button>
        </>
      )}
    </div>
  );
};

export default ServicePopularityReport;
