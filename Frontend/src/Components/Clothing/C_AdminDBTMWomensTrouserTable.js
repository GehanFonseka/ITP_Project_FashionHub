import React, { useEffect, useState } from "react";
import axios from '../../utilities/axios';
import C_AdminDBUpdateTMWomensTrouser from './C_AdminDBUpdateTMWomensTrouser'; 

const C_AdminDBTMWomensTrouserTable = () => {
  const [trouserData, setTrouserData] = useState([]);
  const [selectedTrouser, setSelectedTrouser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTrouserData();
  }, []);

  const fetchTrouserData = async () => {
    try {
      const response = await axios.get('/api/tm-womenstrousers');
      console.log("response.data", response.data);
      setTrouserData(response.data);
    } catch (error) {
      console.error("Error fetching trouser data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tm-womenstrousers/${id}`);
      setTrouserData(trouserData.filter(trouser => trouser._id !== id));
    } catch (error) {
      console.error("Error deleting trouser item:", error);
    }
  };

  const handleUpdate = (trouser) => {
    setSelectedTrouser(trouser);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTrouser(null);
  };

  const handleUpdateSuccess = () => {
    fetchTrouserData(); // Refresh the trouser data after a successful update
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
      <h2>Tailor Made Women's Trouser Inventory</h2>
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
          {trouserData.map((trouser) => (
            <tr key={trouser._id}>
              <td style={styles.td}>{trouser.sellerNo}</td>
              <td style={styles.td}>{trouser.itemNo}</td>
              <td style={styles.td}>{trouser.name}</td>
              <td style={styles.td}>${trouser.price}</td>
              <td style={styles.td}>{trouser.description}</td>
              <td style={styles.td}>
                {trouser.image && (
                  <img
                    src={`http://localhost:5000/uploads/${trouser.image}`} // Adjust the URL as needed
                    alt={trouser.name}
                    style={styles.img}
                    onError={(e) => e.target.src = 'path-to-placeholder-image.jpg'} // Fallback image
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => handleUpdate(trouser)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(trouser._id)}
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
            <C_AdminDBUpdateTMWomensTrouser
              trouser={selectedTrouser}
              onClose={handleModalClose}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default C_AdminDBTMWomensTrouserTable;
