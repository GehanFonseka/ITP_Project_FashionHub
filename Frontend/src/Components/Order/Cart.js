import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

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
    const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here
    doc.addImage(logo, 'PNG', 14, 8, 30, 10); // Adjust size and position of the logo as needed

    let yPosition = 50;

    // Add the centered title "Bill Report" in red
    doc.setFontSize(24);
    doc.setTextColor(139, 0, 0); // Red color for title
    doc.text("Bill Report", doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    // Reset font size and color for the table content
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black for text

    // Add some space after the title
    yPosition += 10;

    // Define the table columns
    const columns = [
      { title: "Item Name", dataKey: "name" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Price (RS)", dataKey: "price" }
    ];

    // Data for the table
    const data = Info.map((item) => ({
      name: item.ItemsN,
      quantity: item.quantity,
      price: item.price.toFixed(2) // Format price to 2 decimal points
    }));

    // Generate the table
    doc.autoTable({
      columns: columns,
      body: data,
      headStyles: { fillColor: [139,0,0] },
      startY: yPosition,
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
      },
    });

    // Get final Y position after the table
    const finalY = doc.lastAutoTable.finalY;

    // Calculate total price
    const totalPrice = Info.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    // Add total price text
    doc.text(`Total Price: RS. ${totalPrice}`, 10, finalY + 10);

    // Save the PDF with a file name
    doc.save("Your Bill.pdf");
};

  
  function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [newlyAddedItems, setNewlyAddedItems] = useState([]);
    const navigate = useNavigate();
  
    const handleAddToCart = (item) => {
      setCartItems([...cartItems, item]);
      setNewlyAddedItems([...newlyAddedItems, item]);  // Track new additions
    };
  
    const handleCheckout = () => {
      navigate("/bill", { state: { newlyAddedItems } }); // Pass new items to the Bill page
    };

    
  
    return (
      <div>
        {/* Render your cart here */}
        <button onClick={handleCheckout}>Proceed to Bill</button>
      </div>
    );
  }

  
  
  

  return (
    <div>
      <div className="flex justify-center items-center mt-28 mb-2">
        <div className="flex justify-center items-center mt-10">
          <div className="text-black uppercase font-sans-serif hover:text-red-600 cursor-pointer text-5xl">Your Fashion Cart</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mt-4">
          <div className="w-[1500px] rounded-xl bg-gray-20 p-4">
            {Info.length > 0 ? (
              Info.map((item) => (
                <div key={item._id} className="flex items-center justify-between border border-gray-400 shadow-sm shadow-gray p-4 mb-4 rounded-lg">
                  <div className="flex items-center">
                     
                     <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.ItemsN} className="w-20 h-20 object-cover mr-4" />
                    
                    
                    <div className="font-sans-serif w-[350px] truncate">{item.ItemsN}</div>
                  </div>
                  <div className="font-sans-serif">Quantity: {item.quantity}</div>
                  <div className="font-sans-serif text-red-600">RS. {item.price}/=</div>
                  <div 
                      onClick={() => { 
                        setdetformId(item._id); 
                        handleDeleteUser(); 
                      }} 
                      className="cursor-pointer bg-gray-200 text-black border border-red rounded-lg px-2 py-2 hover:opacity-60 flex items-center space-x-2"
                    >
                      ❌ <span>Delete</span>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-4xl font-serif uppercase text-center opacity-60">Oops! You have no items</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-4xl text-red-600 font-sans-serif opacity-70">Your Total price:  RS. {totalPrice}</div>
        </div>

        <div className="flex justify-center items-center mt-1">
        </div>
      </form>

      <div className="flex justify-center items-center mb-2 mt-6">
        <button onClick={handleViewOrder} className="w-72 h-20 text-xl text-opacity-80 rounded-lg text-white font sans-serif shadow-black bg-opacity-40 uppercase bg-black hover:opacity-50 shadow-sm">Proceed to CheckOut</button>
        <button onClick={generatePDF} className="w-72 h-20 ml-20 text-xl font sans-serif shadow-black whitespace-nowrap text-opacity-80 rounded-lg text-white bg-opacity-40 uppercase bg-black hover:opacity-50 shadow-sm">Download Bill</button>

      </div>
    </div>
  );
}
