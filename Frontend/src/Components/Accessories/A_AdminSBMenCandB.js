import React, { useState } from "react";
import A_AdminDBCandB from "./A_AdminDBCandB"; // Import the form component for chains and bracelets
import A_AdminDBCandBTable from "./A_AdminDBCandBTable"; // Import the component to display chains and bracelets data in a table

const AdminSBMenCandB = () => {
  const [activeComponent, setActiveComponent] = useState("addChainsAndBracelets");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addChainsAndBracelets":
        return <A_AdminDBCandB />; // Corrected component name
      case "viewChainsAndBracelets":
        return <A_AdminDBCandBTable />; // Corrected component name
      default:
        return <A_AdminDBCandB />; // Default component
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
            onClick={() => setActiveComponent("addChainsAndBracelets")}
          >
            Add Chains & Bracelets
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewChainsAndBracelets")}
          >
            View Chains & Bracelets
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSBMenCandB;
