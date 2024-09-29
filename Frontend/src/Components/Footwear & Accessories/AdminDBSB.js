import React, { useState } from "react";
import F_AdminDBSneakers from "./F_AdminDBSneakers"; // Import the form component for sneakers
import F_AdminDBSneakersTable from "./F_AdminDBSneakersTable"; // Import the component to display sneakers data in a table

const AdminDBSB = () => {
  const [activeComponent, setActiveComponent] = useState("addSneakers");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addSneakers":
        return <F_AdminDBSneakers />;
      case "viewSneakers":
        return <F_AdminDBSneakersTable />;
      default:
        return <F_AdminDBSneakers />;
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
            onClick={() => setActiveComponent("addSneakers")}
          >
            Add Sneakers
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewSneakers")}
          >
            View Sneakers
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
