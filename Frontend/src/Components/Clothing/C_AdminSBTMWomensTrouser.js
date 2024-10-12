import React, { useState } from "react";
import C_AdminDBTMWomensTrouser from "./C_AdminDBTMWomensTrouser"; // Import the form component for TMWomensTrouser
import C_AdminDBTMWomensTrouserTable from "./C_AdminDBTMWomensTrouserTable"; // Import the component to display trouser data in a table

const C_AdminSBTMWomensTrouser = () => {
  const [activeComponent, setActiveComponent] = useState("addTrouser");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addTrouser":
        return <C_AdminDBTMWomensTrouser />;
      case "viewTrouser":
        return <C_AdminDBTMWomensTrouserTable />;
      default:
        return <C_AdminDBTMWomensTrouser />;
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
      <div style={styles.header}>Tailor Made Women's Trouser Dashboard</div>

      {/* Main content area with sidebar and dynamic content */}
      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("addTrouser")}
          >
            Add Trouser
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewTrouser")}
          >
            View Trouser
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default C_AdminSBTMWomensTrouser;
