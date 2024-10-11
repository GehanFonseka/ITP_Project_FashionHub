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
    doc.text("Bill Report", 10, 10);

    const columns = [
      { title: "Item Name", dataKey: "name" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Price", dataKey: "price" }
    ];

    const data = Info.map((item) => ({
      name: item.ItemsN,
      quantity: item.quantity,
      price: item.price
    }));

    doc.autoTable({
      columns: columns,
      body: data,
      startY: 20,
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
      },
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.text(`Total Price: RS.${totalPrice}`, 10, finalY + 10);
    doc.save("billReport.pdf");
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
        <div className="flex justify-center items-center mt-3">
          <div className="text-black uppercase font-thin hover:text-red-600 cursor-pointer text-4xl">Your Shopping Cart</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mt-4">
          <div className="w-[1200px] rounded-xl bg-opacity-10 p-4">
            {Info.length > 0 ? (
              Info.map((item) => (
                <div key={item._id} className="flex items-center justify-between border border-gray-200 shadow-sm shadow-black p-4 mb-2 rounded-lg">
                  <div className="flex items-center">
                    <img src={item.image} alt="" className="w-10 h-10 object-cover mr-4" />
                    <div className="font-serif w-[100px] truncate">{item.ItemsN}</div>
                  </div>
                  <div className="font-mono">Qty: {item.quantity}</div>
                  <div className="font-mono text-red-600">RS {item.price}</div>
                  <div onClick={() => { setdetformId(item._id); handleDeleteUser(); }} className="cursor-pointer bg-red-600 text-white rounded-lg px-2 py-1 hover:opacity-80">Delete</div>
                </div>
              ))
            ) : (
              <p className="text-2xl font-serif uppercase text-center opacity-60">Oops! You have no items</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-2xl text-red-600 font-serif opacity-70">Total price: RS.{totalPrice}</div>
        </div>

        <div className="flex justify-center items-center mt-2">
          <button type="submit" className='w-52 bg-black rounded-full h-10 hover:text-red-500 uppercase font-serif text-white'>Checkout</button>
        </div>
      </form>

      <div className="flex justify-center items-center mb-8 mt-16">
        <button onClick={handleViewOrder} className="w-32 h-8 text-opacity-80 rounded-full text-white font-serif shadow-black bg-opacity-90 uppercase bg-black hover:opacity-80 shadow-sm">View Order</button>
        <button onClick={generatePDF} className="w-52 h-8 ml-4 font-serif shadow-black whitespace-nowrap text-opacity-80 rounded-full text-white bg-opacity-90 uppercase bg-black hover:opacity-80 shadow-sm">Download Bill</button>
      </div>
    </div>
  );
}
