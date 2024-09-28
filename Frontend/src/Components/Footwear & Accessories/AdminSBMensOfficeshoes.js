import React, { useState } from "react";
import F_AdminDBOfficeShoes from "./F_AdminDBOfficeShoes"; // Import the form component for office shoes
import F_AdminDBOfficeShoesTable from "./F_AdminDBOfficeShoesTable"; // Import the component to display office shoes data in a table

const AdminSBMensOfficeShoes = () => {
  const [activeComponent, setActiveComponent] = useState("addOfficeShoes");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addOfficeShoes":
        return <F_AdminDBOfficeShoes />;
      case "viewOfficeShoes":
        return <F_AdminDBOfficeShoesTable />;
      default:
        return <F_AdminDBOfficeShoes />;
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
            onClick={() => setActiveComponent("addOfficeShoes")}
          >
            Add Office Shoes
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewOfficeShoes")}
          >
            View Office Shoes
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSBMensOfficeShoes;
