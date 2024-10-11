import React, { useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
 

  return (
    <nav className="navbar">
     
      <ul className="nav-links">
       
        <li><Link to="/ItemList">Items</Link></li>
        <li><Link to="/FavoritePackages">Favorite</Link></li>
      </ul>
      
      <div className="nav-icons">
        
      </div>
    </nav>
  );
}

export default NavBar;
