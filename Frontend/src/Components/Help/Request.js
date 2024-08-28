import React, { useState } from 'react';

function Request() {
  const [formData, setFormData] = useState({
    requestType: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    orderNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  // Style for the container holding both the heading and the form
  const containerStyle = {
    display: 'flex',
    marginTop: '150px',
    marginBottom: '50px',
    flexDirection: 'column', // Aligns items vertically
    justifyContent: 'center', // Center the form vertically
    alignItems: 'center', // Center the form horizontally
    minHeight: '100vh', // Ensure container takes full height of the viewport
    backgroundColor: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '0 20px', // Add some padding to prevent content from touching the edges
  };

  // Style for the heading outside of the form
  const headingStyle = {
    marginBottom: '50px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  // Style for the form
  const formStyle = {
    backgroundColor: '#a9a9a9', // Light ash color
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '700px',
  };

  // Style for the label elements
  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const labelStyle1 = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    width:'722px',
  };

  // Style for input fields
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#ffff', // Dark ash color
    color: 'black',
  };

  // Style for the textarea field
  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    height: '100px',
  };

  // Style for the submit button
  const buttonStyle = {
    width: '13%',
    padding: '10px',
    backgroundColor: '#333', // Dark color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  // Style for the button hover effect
  const buttonHoverStyle = {
    backgroundColor: '#555',
  };

  return (
    <div style={containerStyle}>
      {/* Heading outside of the form */}
      <div style={headingStyle}>Submit a Request</div>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle1}>
          Request Type:
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            style={inputStyle} // Using inputStyle for consistency
          >
            <option value="">None</option>
           
            <option value="Wrong item received">Wrong item received</option>
            <option value="Missing item from order">Missing item from order</option>
            <option value="Returns and Exchanges">Returns and Exchanges</option>
            <option value="Refunds">Refunds</option>
            <option value="Order Update">General-Other</option>
          </select>
        </label>

        <label style={labelStyle}>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Order Number:
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={textareaStyle}
          ></textarea>
        </label>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Request;
