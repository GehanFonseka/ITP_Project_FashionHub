import React, { useState } from "react";
import './AppointmentForm.css'; // Import the CSS file

function AppointmentForm() {
  // State variables to manage form data
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    date: "",
    time: "",
    services: [],
    requests: ""
  });

  // Service options with categories and prices
  const serviceOptions = {
    Hair: ["Haircut", "Hair Coloring", "Hair Treatment", "Hair Extensions", "Blowout"],
    Facial: ["Basic Facial", "Anti-Aging Facial", "Acne Treatment Facial", "Brightening Facial"],
    "Body Treatment": ["Body Scrub", "Body Wrap", "Cellulite Treatment", "Tanning"],
    Nail: ["Manicure", "Pedicure", "Gel Manicure", "Nail Art"],
    Makeup: ["Basic Makeup Application", "Bridal Makeup", "Makeup Lesson"],
    Massage: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Aromatherapy Massage"]
  };

  // Prices for each service
  const servicePrices = {
    "Haircut": 9600,
    "Hair Coloring": 25600,
    "Hair Treatment": 16000,
    "Hair Extensions": 38400,
    "Blowout": 12800,
    "Basic Facial": 22400,
    "Anti-Aging Facial": 32000,
    "Acne Treatment Facial": 27200,
    "Brightening Facial": 28800,
    "Body Scrub": 19200,
    "Body Wrap": 25600,
    "Cellulite Treatment": 32000,
    "Tanning": 16000,
    "Manicure": 8000,
    "Pedicure": 11200,
    "Gel Manicure": 12800,
    "Nail Art": 4800,
    "Basic Makeup Application": 16000,
    "Bridal Makeup": 48000,
    "Makeup Lesson": 22400,
    "Swedish Massage": 28800,
    "Deep Tissue Massage": 38400,
    "Hot Stone Massage": 35200,
    "Aromatherapy Massage": 32000
  };

  // Function to handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle service selection
  const handleServiceChange = (service) => {
    setFormData((prevData) => {
      const services = prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service];
      return { ...prevData, services };
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! Your appointment has been booked.");
  };

  // Calculate the total cost of selected services
  const totalCost = formData.services.reduce((acc, service) => acc + servicePrices[service], 0);

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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date and Time Selection */}
          <div>
            <label>Select Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Select Time:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
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
                  <label key={service}>
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    {service} - LKR {servicePrices[service].toLocaleString()}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Additional Requests */}
          <div>
            <label>Any Special Requests?</label>
            <textarea
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              placeholder="Let us know if you have any special requests..."
            />
          </div>

          {/* Summary of Selected Services */}
          <div>
            <h3>Selected Services</h3>
            <ul>
              {formData.services.map((service, index) => (
                <li key={index}>
                  {service} - LKR {servicePrices[service].toLocaleString()}
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

