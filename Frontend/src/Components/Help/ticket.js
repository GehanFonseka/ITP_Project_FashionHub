import React, { useState } from 'react';

const TicketForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      firstName,
      lastName,
      contactNumber,
      email,
      category,
      issueTitle,
      description
    };

    try {
      const response = await fetch('http://localhost:8070/api/tickets', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Ticket submitted successfully!');
        // Clear the form fields after successful submission
        setFirstName('');
        setLastName('');
        setContactNumber('');
        setEmail('');
        setCategory('');
        setIssueTitle('');
        setDescription('');
      } else {
        setResponseMessage('Failed to submit ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setResponseMessage('Error submitting ticket. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Raise a Support Ticket</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter your first name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter your last name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            placeholder="Enter your contact number"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
            <option value="saloon">Saloon</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Issue Title</label>
          <input
            type="text"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            required
            placeholder="Enter the issue title"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your issue"
            style={{ ...styles.input, ...styles.textarea }}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Submit Ticket</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555',
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  textarea: {
    resize: 'vertical',
    height: '100px'
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default TicketForm;
