import React, { useState } from "react";
import C_AdminDBWCTshirt from "./C_AdminDBWCTshirt"; // Import the form component for adding t-shirts
import C_AdminDBWCTshirtTable from "./C_AdminDBWCTshirtTable"; // Import the table component to display t-shirts data

const C_AdminSBWCTshirt = () => {
  const [activeComponent, setActiveComponent] = useState("addTshirt");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addTshirt":
        return <C_AdminDBWCTshirt />; // Component for adding women's casual t-shirts
      case "viewTshirt":
        return <C_AdminDBWCTshirtTable />; // Component for viewing the t-shirts in a table
      default:
        return <C_AdminDBWCTshirt />; // Default to the add t-shirt form if no match
    }
  };

  // Inline styles for the dashboard layout
  const styles = {
    adminDashboard: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      backgroundColor: '#343a40',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      fontSize: '24px',
      textTransform: 'uppercase',
    },
    mainContent: {
      display: 'flex',
      flexGrow: 1,
    },
    sidebar: {
      width: '200px',
      backgroundColor: '#343a40',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0',
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'white',
      padding: '15px',
      textAlign: 'left',
      cursor: 'pointer',
      width: '100%',
      textTransform: 'uppercase',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: '#f7f7f7',
    },
  };

  return (
    <div style={styles.adminDashboard}>
      {/* Header */}
      <div style={styles.header}>Admin Dashboard - Women's Casual T-Shirts</div>

      {/* Main content area with sidebar and dynamic content */}
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("addTshirt")}
          >
            Add T-Shirt
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewTshirt")}
          >
            View T-Shirts
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default C_AdminSBWCTshirt;
