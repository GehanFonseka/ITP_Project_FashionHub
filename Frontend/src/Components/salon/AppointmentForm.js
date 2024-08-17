import React, { useState } from "react";
import './AppointmentForm.css'; // Import the CSS file

function AppointmentForm() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState("");

  const serviceOptions = {
    Hair: [
      { name: "Haircut", price: 9600 },
      { name: "Hair Coloring", price: 25600 },
      { name: "Hair Treatment", price: 16000 },
      { name: "Hair Extensions", price: 38400 },
      { name: "Blowout", price: 12800 },
    ],
    Facial: [
      { name: "Basic Facial", price: 22400 },
      { name: "Anti-Aging Facial", price: 32000 },
      { name: "Acne Treatment Facial", price: 27200 },
      { name: "Brightening Facial", price: 28800 },
    ],
    "Body Treatment": [
      { name: "Body Scrub", price: 19200 },
      { name: "Body Wrap", price: 25600 },
      { name: "Cellulite Treatment", price: 32000 },
      { name: "Tanning", price: 16000 },
    ],
    Nail: [
      { name: "Manicure", price: 8000 },
      { name: "Pedicure", price: 11200 },
      { name: "Gel Manicure", price: 12800 },
      { name: "Nail Art", price: 4800 },
    ],
    Makeup: [
      { name: "Basic Makeup Application", price: 16000 },
      { name: "Bridal Makeup", price: 48000 },
      { name: "Makeup Lesson", price: 22400 },
    ],
    Massage: [
      { name: "Swedish Massage", price: 28800 },
      { name: "Deep Tissue Massage", price: 38400 },
      { name: "Hot Stone Massage", price: 35200 },
      { name: "Aromatherapy Massage", price: 32000 },
    ],
  };

  const handleServiceChange = (category, service) => {
    setServices((prevServices) => {
      const exists = prevServices.some(
        (s) => s.name === service.name && s.category === category
      );
      if (exists) {
        return prevServices.filter(
          (s) => !(s.name === service.name && s.category === category)
        );
      } else {
        return [...prevServices, { category, ...service }];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log({
      name,
      contactNumber,
      email,
      date,
      time,
      services,
      requests,
    });
    alert("Thank you! Your appointment has been booked.");
  };

  const totalCost = services.reduce((acc, service) => acc + service.price, 0);

  return (
    <div className="appointment-form-background">
      <div className="container">
        <h2>Book Your Appointment</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Date and Time Selection */}
          <div>
            <label>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select Time:</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
            </select>
          </div>

          {/* Service Selection */}
          <div className="checkbox-group">
            <h3>Choose Your Service(s)</h3>
            {Object.keys(serviceOptions).map((category) => (
              <div className="service-category" key={category}>
                <h4>{category}</h4>
                {serviceOptions[category].map((service) => (
                  <label key={service.name}>
                    <input
                      type="checkbox"
                      onChange={() => handleServiceChange(category, service)}
                    />
                    {service.name} - LKR {service.price.toLocaleString()}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Additional Requests */}
          <div>
            <label>Any Special Requests?</label>
            <textarea
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              placeholder="Let us know if you have any special requests..."
            />
          </div>

          {/* Summary of Selected Services */}
          <div>
            <h3>Selected Services</h3>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  {service.name} - LKR {service.price.toLocaleString()}
                </li>
              ))}
            </ul>
            <h4 className="total-cost">Total: LKR {totalCost.toLocaleString()}</h4>
          </div>

          {/* Submit Button */}
          <button type="submit">Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
