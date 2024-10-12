import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderManage() {
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const shippingPrice = 200;
  const [FormId, setdetformId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/orders`);
        const data = await response.json();
        setOrderDetailsList(data.items);
        setFilteredOrders(data.items); // Set both orderDetailsList and filteredOrders
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter orders based on the search query
  useEffect(() => {
    const filtered = orderDetailsList.filter((order) =>
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.City.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orderDetailsList]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/orders/${FormId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setFilteredOrders((prev) => prev.filter((items) => items._id !== FormId));
        alert("Deleted successfully");
        window.location.reload();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 mt-12" style={{marginTop: '98px'}}> {/* Added mt-10 for page margin */}
      <div className="flex justify-between items-center mb-6">
        <Link to={`/bill`}>
          <div className="text-black uppercase font-serif hover:text-red-600 cursor-pointer hover:underline">
            Back
          </div>
        </Link>
        <h1 className="text-xl font-semibold text-gray-700">Order Management Dashboard</h1>
      </div>

      {/* Adjusted spacing for the search bar */}
      <div className="flex justify-center mb-6 mt-10"> {/* Added margin-top to separate from header */}
        <input
          type="text"
          placeholder="Search by Order ID, Address, or City"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80"
        />
      </div>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted margin-top */}
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-white shadow-lg rounded-lg flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">Order ID: {order._id}</div>
              <button
                onClick={() => { setdetformId(order._id); handleDeleteUser(); }}
                className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {/* Display Address Information */}
            <div className="mt-2">
              <strong className="uppercase">Address:</strong>
              <p>{order.Address}</p>
              <p>{order.Apartment}</p>
              <p>{order.City}</p>
              <p>{order.Postal}</p>
            </div>

            {/* Display Items */}
            <div className="mt-2">
              <h4 className="font-semibold uppercase">Items:</h4>
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between mb-1">
                  <span className="truncate">
                    {item.ItemsN} (x{item.quantity})
                  </span>
                  <span className="text-red-600">
                    RS. {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <hr className="h-2 text-black" />

            {/* Display Shipping and Total Price */}
          </div>
        ))}
      </div>
    </div>
  );
}
