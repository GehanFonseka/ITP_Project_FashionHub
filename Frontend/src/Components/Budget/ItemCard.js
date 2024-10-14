import React from "react";
import "./ItemCard.css"; // Ensure CSS is imported
import { useNavigate } from 'react-router-dom';




const ItemCard = ({ item, onSelect, isSelected }) => {

  const navigate = useNavigate();

  const handleClick = (tshirt) => {
  
    localStorage.setItem('selectedProduct', JSON.stringify(tshirt));
    localStorage.setItem('productType', 'tshirt'); // Updated product type
    navigate('/product-details');
  };
  
  return (
    <div
      className={`item-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      
      <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="price">Rs. {item.price}</p>
      {/* Optional button for additional actions */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          handleClick(item); // Call handleClick with the tshirt data
        }}
          >
            View Details
</button>

    </div>
  );
};

export default ItemCard;
