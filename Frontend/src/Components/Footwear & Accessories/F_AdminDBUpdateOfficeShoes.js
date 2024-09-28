import React, { useState, useEffect } from 'react';
import axios from '../../utilities/axios';

const F_AdminDBUpdateOfficeShoes = ({ officeShoes, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    sellerNo: '',
    itemNo: '',
    name: '',
    price: '',
    description: '',
    image: '',

    quantity: '', // Added quantity field here

  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (officeShoes) {
      setFormData({
        sellerNo: officeShoes.sellerNo || '',
        itemNo: officeShoes.itemNo || '',
        name: officeShoes.name || '',
        price: officeShoes.price || '',
        description: officeShoes.description || '',
        image: officeShoes.image || '',
        quantity: officeShoes.quantity || '', // Set initial quantity from officeShoes data

      });
    }
  }, [officeShoes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/office-shoes/${officeShoes._id}`, formData); // Adjusted to update office shoes
    setError(null); // Reset error state
    if (!officeShoes || !officeShoes._id) {
      setError("Missing office shoe item ID.");
      return;
    }

    try {
      await axios.put(`/api/office-shoes/${officeShoes._id}`, formData);

      onUpdate(); // Notify parent component of the update
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating office shoes item:", error);
      setError("Failed to update office shoes item. Please try again.");

      if (error.response && error.response.data && error.response.data.message) {
        setError(`Failed to update item: ${error.response.data.message}`);
      } else {
        setError("Failed to update office shoes item. Please try again.");
      }
    }
  
  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.close} onClick={onClose}>&times;</span>
        <h2>Update Office Shoes</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Seller No:
            <input
              type="text"
              name="sellerNo"
              value={formData.sellerNo}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label>
            Item No:
            <input
              type="text"
              name="itemNo"
              value={formData.itemNo}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...styles.input, height: '120px' }} // Increased height for better visibility
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label>
            Quantity: {/* Add quantity input here */}
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.submitButton}>Update</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure the modal is on top
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '800px', // Increased width for the modal
    maxWidth: '95vw', // Ensure it does not exceed the viewport width
    boxSizing: 'border-box',
    minWidth: '600px', // Ensure a minimum width for better appearance
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  submitButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default F_AdminDBUpdateOfficeShoes;
