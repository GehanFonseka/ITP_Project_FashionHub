import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Bill() {
 
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const shippingPrice = 200;
 
  console.log(orderDetailsList)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/orders/last`);
        const data = await response.json();
        console.log(data)
          
        
        // Ensure data is set correctly
        setOrderDetailsList(data.items);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
         
         <div className="flex justify-center items-center mt-28 gap-28">

            <div>
                <div className="flex justify-center items-center">
                    <div className="font sans-serif text-5xl text-blue-500">
                    Order Confirmed ! 

                    </div>

                </div>
                <div className="flex justify-center items-center">
                    <div className="font-thin text-xl text-gray-700 w-92 ml-8 break-words">
                    Thank you for your trust . Your order now on the way. please download the receipt. 

                    </div>

                </div>
               

            </div>
            <div>
    <img 
        src="https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-416.jpg?t=st=1727697659~exp=1727701259~hmac=bb1e92d59e7e5a5ae07eb0923aa4e0650d4791a2b4fc817131e16d343bd620ec&w=1060" 
        alt="Cash Delivery Concept" 
        className="rounded-full w-[200px] h-[200px]" 
    />
</div>

         </div>
         <div className="flex justify-center items-center mt-2">
          
        
          </div>
        
      <div className="flex justify-center items-center  gap-4">
        <div className=" flex justify-center items-center">
          <div>
          <div>
                <img src="https://img.freepik.com/free-vector/cash-delivery-concept_23-2148786295.jpg?t=st=1727697407~exp=1727701007~hmac=170bd9957b2e5efd2e72f616cb9309721337834b590c71947b903edcbf5ac4bd&w=1060" alt=""  className="rounded-full w-[400px] h-[400px]"/>

            </div>
          </div>
          <div className="w-[800px] h-[600px] mt-2 shadow-sm bg-gray-200 scrollbar-none rounded-lg overflow-auto">
            <div className="flex flex-col p-4">
            <div className=" uppercase text-gray-600  font sans-serif  text-4xl mt-2 mb-2">
            My order details
         </div>

              {orderDetailsList.map((order) => (
                <div
                  key={order._id}
                  className="mb-4 p-4 border  border-gray-300  rounded-lg bg-white shadow-md"
                >
                  <div className="flex justify-center items-center">
                    <div>
                    <div className="font-semibold text-lg  ">Order ID: {order._id}</div>
                    </div>
                  </div>
                  
                  
                  {/* Display Address Information */}
                  <div className="mt-2">
                    <div className="flex  uppercase justify-center items-center">
                      <div>
                      <strong>Address:</strong>
                      </div>
                    </div>
                    <div className="flex font-serif mt-2 justify-center items-center">
                      <div>
                      <p>{order.Address}</p>
                      </div>
                    </div>

                    <div className="flex font-serif mt-2 justify-center items-center">
                      <div>
                      <p>{order.Apartment}</p>
                      </div>
                    </div>
                    <div className="flex font-serif mt-2 justify-center items-center">
                      <div>
                      <p>{order.City}</p>
                      </div>
                    </div>
                    <div className="flex font-serif mt-2 justify-center items-center">
                      <div>
                      <p>{order.Postal}</p>
                      </div>
                    </div>
                    
                    
                  
                  
                   
                  </div>

                  {/* Display Items */}
                  <div className="mt-4">
                    <h4 className="font-semibold uppercase">Orderd Items:</h4>
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

                  {/* Display Shipping and Total Price */}
                 
                 
                  
                 
                </div>
              ))}
            </div>
          </div>
          <div>
          <div>
                <img src="https://img.freepik.com/free-vector/woman-online-shipping-illustration_33099-583.jpg?t=st=1727697819~exp=1727701419~hmac=6ceabd1ed95a8175e0884bf0f8e3cc69c28c1f6c135924339f4b575fb0ccd80f&w=1380" alt=""  className="rounded-full w-[400px] h-[300px]"/>

            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        
          <Link to={`/bill`}>
            <div className="text-blue uppercase font sans-serif hover:text-red-600 cursor-pointer hover:underline">
              back to checkout
            </div>
          </Link>
        </div>

      <div className="flex justify-center items-center">
        <div className="mt-8 mb-20">
          <Link to="/track">
         <button className="bg-black w-60 h-20 size-xl text-white font sans-serif hover:text-red-400 rounded-md">Track Delivery</button>
         </Link>
        </div>
      </div>
    </div>
  );
}
