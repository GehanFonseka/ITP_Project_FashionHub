import React, { useState, useEffect } from 'react';
import axios from '../../utilities/axios';
import ClothingItemsChart from '../Clothing/ClothingItemsChart';

const C_AdminReport = () => {
  const [clothingData, setClothingData] = useState([]);

  useEffect(() => {
    const fetchClothingData = async () => {
      try {
        const response = await axios.get('/api/clothing-stats');
        setClothingData(response.data);
      } catch (error) {
        console.error('Error fetching clothing data:', error);
      }
    };

    fetchClothingData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Clothing Items Financial Management</h2>
      <ClothingItemsChart data={clothingData} />
    </div>
  );
};

export default C_AdminReport;
