import React from "react";
import SidebarOne from "./SidebarOne";

const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarOne />
      
      {/* Main content on the right */}
      <div className="flex-grow ml-64 p-4">
        {children} {/* Render the child components/pages here */}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
