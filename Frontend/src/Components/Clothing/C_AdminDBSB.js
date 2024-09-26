import React, { useState } from "react";
import C_AdminDBPants from "./C_AdminDBPants"; // Import the form component
import C_AdminDBPantsTable from "./C_AdminDBPantsTable"; // Import the component to display pants data in a table

const AdminDBSB = () => {
  const [activeComponent, setActiveComponent] = useState("addPants");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addPants":
        return <C_AdminDBPants />;
      case "viewPants":
        return <C_AdminDBPantsTable />;
      default:
        return <C_AdminDBPants />;
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
      <div style={styles.header}>Admin Dashboard</div>

      {/* Main content area with sidebar and dynamic content */}
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("addPants")}
          >
            Add Pants
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewPants")}
          >
            View Pants
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDBSB;
