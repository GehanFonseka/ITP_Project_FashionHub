import React from "react";
import SidebarOne from "./SidebarOne";


const LayoutWithSidebar = ({ children }) => {
  return (
    <div className="flex">
      <SidebarOne />
      
      
      <div className="flex-grow ml-64 p-4">
        {children} 
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
