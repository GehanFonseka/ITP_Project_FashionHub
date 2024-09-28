import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import F_AdminDBUpdateOfficeShoes from './F_AdminDBUpdateOfficeShoes'; // Update the import for the office shoes update component

const F_AdminDBOfficeShoesTable = () => {
  const [officeShoesData, setOfficeShoesData] = useState([]);
  const [selectedOfficeShoes, setSelectedOfficeShoes] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOfficeShoesData();
  }, []);

  const fetchOfficeShoesData = async () => {
    try {
      const response = await axios.get('/api/officeshoes'); // Update the endpoint for office shoes
      console.log("response.data", response.data);
      setOfficeShoesData(response.data);
    } catch (error) {
      console.error("Error fetching office shoes data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/officeshoes/${id}`); // Update the endpoint for deleting office shoes
      setOfficeShoesData(officeShoesData.filter(officeShoes => officeShoes._id !== id));
    } catch (error) {
      console.error("Error deleting office shoes item:", error);
    }
  };

  const handleUpdate = (officeShoes) => {
    setSelectedOfficeShoes(officeShoes);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOfficeShoes(null);
  };

  const handleUpdateSuccess = () => {
    fetchOfficeShoesData(); // Refresh the office shoes data after a successful update
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
      <h2>Office Shoes Inventory</h2> {/* Update the title */}
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
          {officeShoesData.map((officeShoes) => (
            <tr key={officeShoes._id}>
              <td style={styles.td}>{officeShoes.sellerNo}</td>
              <td style={styles.td}>{officeShoes.itemNo}</td>
              <td style={styles.td}>{officeShoes.name}</td>
              <td style={styles.td}>lkr{officeShoes.price}</td>
              <td style={styles.td}>{officeShoes.description}</td>
              <td style={styles.td}>
                {officeShoes.image && (
                  <img
                    src={`http://localhost:5000/uploads/${officeShoes.image}`} // Adjust the URL as needed
                    alt={officeShoes.name}
                    style={styles.img}
                    onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => handleUpdate(officeShoes)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(officeShoes._id)}
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
            <F_AdminDBUpdateOfficeShoes
              officeShoes={selectedOfficeShoes}
              onClose={handleModalClose}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default F_AdminDBOfficeShoesTable;
