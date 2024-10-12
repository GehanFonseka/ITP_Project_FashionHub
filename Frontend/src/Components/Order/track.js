import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Track() {
  const [orderStatus, setOrderStatus] = useState('Processing'); // Initial status
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate fetching order status
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderStatus('Out for Delivery'); // Change status after 3 seconds for demonstration
      setLoading(false); // Stop loading after fetching data
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-28">
        <Link to={`/order`}>
          <div className="text-black uppercase font-serif hover:text-red-600 cursor-pointer hover:underline">
            back
          </div>
        </Link>
      </div>
      <div className='flex justify-center items-center mb-8 mt-10'>
        <div className='bg-gray-100 rounded-xl w-[1200px] h-[450px]'>
          <div className='mt-3 ml-4'>
            <div className='text-2xl font-serif'>
              Order #890
            </div>
            <div className='font-serif'>
              Placed on 03/11/2024
            </div>

            <div className='mt-8'>
              <div className='text-2xl font-serif'>
                Order Status
              </div>

              <div className='bg-slate-50 shadow-lg rounded-xl mt-5 w-[1100px] h-[200px] flex items-center justify-center'>
                {loading ? (
                  <div className="text-xl font-serif">Loading...</div> // Loading state
                ) : (
                  <div>
                    <img 
                      src="https://img.freepik.com/free-vector/person-doing-delivery-activities-pack_23-2148502069.jpg?t=st=1727432442~exp=1727436042~hmac=275521409da8024d9a48e19aba6149e5e8fe5a7cace3777a1d0fb9440df6dae5&w=996" 
                      alt="Order in transit" 
                      className='w-[600px] h-[200px] object-cover ml-52' 
                    />
                    <div className="text-lg font-serif mt-4">
                      Current Status: {orderStatus} {/* Display current status */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-3 ml-4'>
            <div className='text-2xl text-gray-700 font-serif'>
              Order #890
            </div>
            <div className='text-2xl text-gray-700 font-serif'>
              Placed on 03/11/2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
