import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";


const BLayout = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main content where child routes will be rendered */}
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      
    </>
  );
};

export default BLayout;
