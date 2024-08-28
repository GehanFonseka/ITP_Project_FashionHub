import React, { useState } from 'react';

function Sidebar({ setSection }) {
  return (
    <div style={sidebarStyle}>
      <h2 style={headerStyle}>Dashboard</h2>
      <ul style={listStyle}>
        <li style={listItemStyle} onClick={() => setSection('request')}>Request</li>
        <li style={listItemStyle} onClick={() => setSection('chatbot')}>Chatbot</li>
        <li style={listItemStyle} onClick={() => setSection('faq')}>FAQ</li>
        <li style={listItemStyle} onClick={() => setSection('refundPolicy')}>Refund Policy</li>
        <li style={listItemStyle} onClick={() => setSection('shippingPolicy')}>Shipping Policy</li>
      </ul>
    </div>
  );
}

function Dashboard() {
  const [section, setSection] = useState('request');

  const renderSection = () => {
    switch (section) {
      case 'chatbot':
        return <Chatbot />;
      case 'faq':
        return <FAQ />;
      case 'refundPolicy':
        return <RefundPolicy />;
      case 'shippingPolicy':
        return <ShippingPolicy />;
      default:
        return <Request />;
    }
  };

  return (
    <div style={dashboardStyle}>
      <Sidebar setSection={setSection} />
      <div style={contentStyle}>
        {renderSection()}
      </div>
    </div>
  );
}

function Request() {
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const requestTypes = [
    'Wrong item received',
    'Missing item from order',
    'Returns and Exchanges',
    'Refunds',
    'General-Other',
  ];

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email sent to: ${email}\nMessage: ${message}`);
    // Here you would typically send the email using a backend service.
  };

  const renderForm = () => {
    if (!selectedRequestType) return null;

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formHeader}>{selectedRequestType}</h3>
        <div style={styles.emailFormContainer}>
          <h3 style={styles.formHeader}>Reply via Email</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Customer Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={styles.input}
              placeholder="Enter customer's email"
            />
            <label style={styles.label}>Message:</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              style={styles.textarea}
              placeholder="Enter your message"
            />
            <button type="submit" style={styles.button}>Send</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.requestContainer}>
      <div style={styles.requestTypesContainer}>
        <h3 style={styles.sectionHeader}>Request Types</h3>
        <ul style={styles.requestTypesList}>
          {requestTypes.map((type) => (
            <li
              key={type}
              style={styles.requestTypeItem}
              onClick={() => setSelectedRequestType(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.requestFormContainer}>
        {renderForm()}
      </div>
    </div>
  );
}

function Chatbot() {
  return <div><h2>Chatbot Section</h2></div>;
}

function FAQ() {
  return <div><h2>FAQ Section</h2></div>;
}

function RefundPolicy() {
  return <div><h2>Refund Policy Section</h2></div>;
}

function ShippingPolicy() {
  return <div><h2>Shipping Policy Section</h2></div>;
}

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;

// Inline CSS styles
const sidebarStyle = {
  marginTop: '88px',
  width: '250px',
  height: '88vh',
  backgroundColor: '#333',
  color: 'white',
  padding: '20px',
  boxSizing: 'border-box',
};

const headerStyle = {
  marginBottom: '20px',
  fontSize: '22px',
  color: '#fff',
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
};

const listItemStyle = {
  padding: '10px 0',
  cursor: 'pointer',
  fontSize: '18px',
  hover: {
    backgroundColor: '#444',
  },
};

const dashboardStyle = {
  display: 'flex',
  height: '100vh',
};

const contentStyle = {
  flex: '1',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  overflowY: 'auto',
  marginTop: '70px',
};

// Styles for Request component
const styles = {
  requestContainer: {
    display: 'flex',
    gap: '20px',
  },
  requestTypesContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '300px',
  },
  requestFormContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '580px',
  },
  sectionHeader: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  requestTypesList: {
    listStyleType: 'none',
    padding: '0',
  },
  requestTypeItem: {
    padding: '10px 0',
    cursor: 'pointer',
    fontSize: '18px',
    borderBottom: '1px solid #ddd',
    color: '#007bff',
  },
 
  formHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  textarea: {
    minHeight: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width:'90px',
  },
  emailFormContainer: {
    marginTop: '220px',

  },
};
