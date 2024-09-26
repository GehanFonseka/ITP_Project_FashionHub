import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchCartAppointments = async () => {
      try {
        const response = await axios.get('/api/appointment/cart');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching cart appointments:', error);
      }
    };

    fetchCartAppointments();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await axios.put(`/api/appointment/${id}/remove-cart`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error('Error removing appointment from cart:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {appointments.length === 0 ? (
        <p>No appointments in the cart.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              {appointment.name} - {appointment.date} at {appointment.time}
              <button onClick={() => removeFromCart(appointment._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
