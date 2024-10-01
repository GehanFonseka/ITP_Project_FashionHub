import React, { useState } from "react";
import C_AdminDBRMMensBlazer from "./C_AdminDBRMMensBlazer"; // Import the form component for RMMensBlazer
import C_AdminDBRMMensBlazerTable from "./C_AdminDBRMMensBlazerTable"; // Import the component to display blazer data in a table

const C_AdminSBRMMensBlazer = () => {
  const [activeComponent, setActiveComponent] = useState("addBlazer");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addBlazer":
        return <C_AdminDBRMMensBlazer />;
      case "viewBlazer":
        return <C_AdminDBRMMensBlazerTable />;
      default:
        return <C_AdminDBRMMensBlazer />;
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
      marginTop: '20px',
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
      <div style={styles.header}>Ready-Made Men's Blazer Dashboard</div>

      {/* Main content area with sidebar and dynamic content */}
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("addBlazer")}
          >
            Add Blazer
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewBlazer")}
          >
            View Blazer
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default C_AdminSBRMMensBlazer;
