import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import F_AdminDBUpdateSneakers from './F_AdminDBUpdateSneakers'; // Import the update component

const F_AdminDBSneakersTable = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [selectedSneakers, setSelectedSneakers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSneakersData();
  }, []);

  const fetchSneakersData = async () => {
    try {
      const response = await axios.get('/api/sneakers');
      console.log("response.data", response.data);
      setSneakersData(response.data);
    } catch (error) {
      console.error("Error fetching sneakers data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sneakers/${id}`);
      setSneakersData(sneakersData.filter(sneakers => sneakers._id !== id));
    } catch (error) {
      console.error("Error deleting sneakers item:", error);
    }
  };

  const handleUpdate = (sneakers) => {
    setSelectedSneakers(sneakers);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSneakers(null);
  };

  const handleUpdateSuccess = () => {
    fetchSneakersData(); // Refresh the sneakers data after a successful update
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
      <h2>Sneakers Inventory</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Seller No</th>
            <th style={styles.th}>Item No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Quantity</th> {/* New Quantity Column */}
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sneakersData.map((sneakers) => (
            <tr key={sneakers._id}>
              <td style={styles.td}>{sneakers.sellerNo}</td>
              <td style={styles.td}>{sneakers.itemNo}</td>
              <td style={styles.td}>{sneakers.name}</td>
              <td style={styles.td}>${sneakers.price}</td>
              <td style={styles.td}>{sneakers.quantity}</td> {/* Displaying Quantity */}
              <td style={styles.td}>{sneakers.description}</td>
              <td style={styles.td}>
                {sneakers.image && (
                  <img
                    src={`http://localhost:5000/uploads/${sneakers.image}`} // Adjust the URL as needed
                    alt={sneakers.name}
                    style={styles.img}
                    onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => handleUpdate(sneakers)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(sneakers._id)}
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
            <F_AdminDBUpdateSneakers
              sneakers={selectedSneakers}
              onClose={handleModalClose}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default F_AdminDBSneakersTable;
