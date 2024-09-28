import React, { useState } from "react";
import F_AdminDBBoots from "./F_AdminDBBoots"; // Correct import for women's boots form
import F_AdminDBBootsTable from "./F_AdminDBBootsTable"; // Correct import for women's boots table

const AdminSBWomensBoots = () => {
  const [activeComponent, setActiveComponent] = useState("addWomensBoots");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addWomensBoots":
        return <F_AdminDBBoots />; // Corrected component name
      case "viewWomensBoots":
        return <F_AdminDBBootsTable />; // Corrected component name
      default:
        return <F_AdminDBBoots />; // Default to the correct form component
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
            onClick={() => setActiveComponent("addWomensBoots")}
          >
            Add Women's Boots
          </button>
          <button
            style={styles.button}
            onClick={() => setActiveComponent("viewWomensBoots")}
          >
            View Women's Boots
          </button>
        </div>
        <div style={styles.content}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSBWomensBoots;
