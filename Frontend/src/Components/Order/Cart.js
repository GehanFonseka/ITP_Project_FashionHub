import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function Cart() {
  const [Info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [FormId, setdetformId] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/cart`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setInfo(data.items);

          const total = data.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(total);
        } else {
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []);

  // Delete item from cart
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/cart/${FormId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((prev) => prev.filter((item) => item._id !== FormId));
        alert("Item deleted successfully.");
        window.location.reload();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearCart = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear the cart?");
    if (!confirmClear) return;

    try {
      const res = await fetch(`http://localhost:5000/api/items/cart/clear`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setInfo([]); // Clear the state holding cart items
        setTotalPrice(0); // Reset total price
        alert("Cart cleared successfully.");
      } else {
        alert(data.message || "Failed to clear the cart.");
      }
    } catch (error) {
      alert("Error clearing the cart. Please try again.");
    }
  };

  // Handle viewing order
  const handleViewOrder = async () => {
    try {
      const formDataWithItems = {
        items: Info.map((item) => ({
          ItemsN: item.ItemsN,
          price: item.price,
          quantity: item.quantity,
          sellerNo: item.sellerNo, // assuming sellerNo is in your cart data
        })),
        totalPrice: totalPrice,
      };

      console.log("Data to send:", formDataWithItems);

      // Store current cart items in local storage
      localStorage.setItem("currentOrder", JSON.stringify(formDataWithItems.items));

      // Post the order data to the backend
      const response = await fetch("http://localhost:5000/api/items/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithItems),
      });

      if (!response.ok) {
        throw new Error("Failed to post order data");
      }

      // Navigate to the Bill page
      navigate("/bill");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Save order to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithItems = {
        items: Info.map((item) => ({
          ItemsN: item.ItemsN,
          price: item.price,
          quantity: item.quantity,
        })),
        length: Info.length,
        totalPrice: totalPrice,
      };

      console.log("data to submit", formDataWithItems);

      const res = await fetch("http://localhost:5000/api/items/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithItems),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        alert("Order submitted successfully.");
        navigate("/bill");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Generate PDF for the bill
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add your logo's Base64 string or URL here
    const logo = 'data:image/png;base64,...'; // Your logo here

    // Content of the PDF
    doc.text("Order Details", 14, 20);
    doc.autoTable({
      head: [['Item', 'Price', 'Quantity', 'Total']],
      body: Info.map(item => [
        item.ItemsN,
        item.price,
        item.quantity,
        item.price * item.quantity
      ]),
    });
    doc.text(`Total: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save('order-bill.pdf');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginTop: '150px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Shopping Cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Info.length === 0 ? (
          <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
        ) : (
          <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Item</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Price</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Quantity</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ccc' }}>Total</th>
                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ccc' }}></th>
              </tr>
            </thead>
            <tbody>
              {Info.map((item) => (
                <tr key={item._id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.ItemsN}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>${item.price}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>${item.price * item.quantity}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                    <FaTrashAlt 
                      style={{ cursor: 'pointer', color: 'red', fontSize: '18px' }} 
                      onClick={() => { setdetformId(item._id); handleDeleteUser(); }} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          <strong>Total Price: </strong>
          <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>${totalPrice}</span>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <button 
            onClick={handleViewOrder} 
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 25px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            View Order
          </button>
          <button 
            onClick={handleSubmit} 
            style={{
              backgroundColor: '#008CBA',
              color: 'white',
              padding: '12px 25px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Submit Order
          </button>
          <button 
            onClick={clearCart} 
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '12px 25px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={generatePDF} 
          style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '12px 25px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
