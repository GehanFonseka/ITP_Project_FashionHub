import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import F_AdminDBUpdateCandB from './A_AdminDBUpdateCandB'; // Update the import for the Chains and Bracelets update component

const A_AdminDBCandBTable = () => {
  const [candBData, setCandBData] = useState([]);
  const [selectedCandB, setSelectedCandB] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCandBData();
  }, []);

  const fetchCandBData = async () => {
    try {
      const response = await axios.get('/api/chainsandbracelets'); // Update the endpoint for Chains and Bracelets
      console.log("response.data", response.data);
      setCandBData(response.data);
    } catch (error) {
      console.error("Error fetching Chains and Bracelets data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/chainsandbracelets/${id}`); // Update the endpoint for deleting Chains and Bracelets
      setCandBData(candBData.filter(candB => candB._id !== id));
    } catch (error) {
      console.error("Error deleting Chains and Bracelets item:", error);
    }
  };

  const handleUpdate = (candB) => {
    setSelectedCandB(candB);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCandB(null);
  };

  const handleUpdateSuccess = () => {
    fetchCandBData(); // Refresh the Chains and Bracelets data after a successful update
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
      <h2>Chains and Bracelets Inventory</h2> {/* Update the title */}
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
          {candBData.map((candB) => (
            <tr key={candB._id}>
              <td style={styles.td}>{candB.sellerNo}</td>
              <td style={styles.td}>{candB.itemNo}</td>
              <td style={styles.td}>{candB.name}</td>
              <td style={styles.td}>${candB.price}</td>
              <td style={styles.td}>{candB.description}</td>
              <td style={styles.td}>
                {candB.image && (
                  <img
                    src={`http://localhost:5000/uploads/${candB.image}`} // Adjust the URL as needed
                    alt={candB.name}
                    style={styles.img}
                    onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => handleUpdate(candB)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(candB._id)}
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
            <F_AdminDBUpdateCandB
              candB={selectedCandB}
              onClose={handleModalClose}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default A_AdminDBCandBTable;
