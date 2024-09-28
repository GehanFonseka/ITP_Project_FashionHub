import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import F_AdminDBUpdateBoots from './F_AdminDBUpdateBoots'; // Import the update component for boots

const F_AdminDBBootsTable = () => {
  const [bootsData, setBootsData] = useState([]);
  const [selectedBoots, setSelectedBoots] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBootsData();
  }, []);

  const fetchBootsData = async () => {
    try {
      const response = await axios.get('/api/boots'); // Adjusted to fetch boots data
      console.log("response.data", response.data);
      setBootsData(response.data);
    } catch (error) {
      console.error("Error fetching boots data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/boots/${id}`); // Adjusted to delete boots
      setBootsData(bootsData.filter(boots => boots._id !== id));
    } catch (error) {
      console.error("Error deleting boots item:", error);
    }
  };

  const handleUpdate = (boots) => {
    setSelectedBoots(boots);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBoots(null);
  };

  const handleUpdateSuccess = () => {
    fetchBootsData(); // Refresh the boots data after a successful update
    handleModalClose(); // Close modal after successful update
  };

  // Inline styles for table layout
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      borderBottom: '2px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#f8f8f8',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '10px',
    },
    button: {
      margin: '0 5px',
      padding: '5px 10px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '4px',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    updateButton: {
      backgroundColor: '#2196F3',
      color: 'white',
    },
    img: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };

  return (
    <div>
      <h2>Boots Inventory</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Seller No</th>
            <th style={styles.th}>Item No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bootsData.map((boots) => (
            <tr key={boots._id}>
              <td style={styles.td}>{boots.sellerNo}</td>
              <td style={styles.td}>{boots.itemNo}</td>
              <td style={styles.td}>{boots.name}</td>
              <td style={styles.td}>lkr{boots.price}</td>
              <td style={styles.td}>{boots.description}</td>
              <td style={styles.td}>
                {boots.image && (
                  <img
                    src={`http://localhost:5000/uploads/${boots.image}`} // Adjust the URL as needed
                    alt={boots.name}
                    style={styles.img}
                    onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => handleUpdate(boots)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(boots._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <>
          <div style={styles.overlay} onClick={handleModalClose}></div>
          <div style={styles.modal}>
            <F_AdminDBUpdateBoots
              boots={selectedBoots}
              onClose={handleModalClose}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default F_AdminDBBootsTable;
