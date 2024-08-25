import React, { useState } from "react";
import './AppointmentForm.css'; // Import the CSS file
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData || {}; // Get the data passed for editing, if any

  // State variables to manage form data and validation errors
  const [formData, setFormData] = useState({
    name: editData.name || "",
    contactNumber: editData.contactNumber || "",
    email: editData.email || "",
    date: editData.date || "",
    time: editData.time || "",
    services: editData.services || [],
    requests: editData.requests || "",
  });
  const [errors, setErrors] = useState({});

  // Service options with categories and prices
  const serviceOptions = {
    Hair: ["Haircut", "Hair Coloring", "Hair Treatment", "Hair Extensions", "Blowout"],
    Facial: ["Basic Facial", "Anti-Aging Facial", "Acne Treatment Facial", "Brightening Facial"],
    "Body Treatment": ["Body Scrub", "Body Wrap", "Cellulite Treatment", "Tanning"],
    Nail: ["Manicure", "Pedicure", "Gel Manicure", "Nail Art"],
    Makeup: ["Basic Makeup Application", "Bridal Makeup", "Makeup Lesson"],
    Massage: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Aromatherapy Massage"],
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
    "Aromatherapy Massage": 32000,
  };

  // Function to handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // Trigger validation for the specific field
    validateField(name, value);
  };

  // Function to handle service selection
  const handleServiceChange = (service) => {
    setFormData(prevData => {
      const services = prevData.services.includes(service)
        ? prevData.services.filter(s => s !== service)
        : [...prevData.services, service];
      return { ...prevData, services };
    });
  };

  // Validate specific field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const namePattern = /^[A-Za-z\s]+$/; // Letters and spaces only
    const contactNumberPattern = /^\d{10}$/; // Exactly 10 digits

    switch (name) {
      case "name":
        newErrors.name = !value || !namePattern.test(value) || value.length < 6
          ? "Full Name must only contain letters and spaces, and be at least 6 characters long."
          : "";
        break;
      case "contactNumber":
        newErrors.contactNumber = !value || !contactNumberPattern.test(value)
          ? "Contact Number must be exactly 10 digits & Only contain Numbers."
          : "";
        break;
      case "email":
        newErrors.email = !value || !value.includes('@') || value.length < 11
          ? "Email Address must include '@' and be at least 11 characters long."
          : "";
        break;
      case "date":
        const today = new Date();
        const selectedDate = new Date(value);
        const twoMonthsLater = new Date(today.setMonth(today.getMonth() + 2));
        newErrors.date = !value || selectedDate < new Date() || selectedDate > twoMonthsLater
          ? "Date must be within the next 2 months and not a past date."
          : "";
        break;
      case "time":
        newErrors.time = !value ? "You must select a time." : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/; // Letters and spaces only
    const contactNumberPattern = /^\d{10}$/; // Exactly 10 digits

    // Name validation
    if (!formData.name || !namePattern.test(formData.name) || formData.name.length < 6) {
      newErrors.name = "Full Name must only contain letters and spaces, and be at least 6 characters long.";
    }

    // Contact number validation
    if (!formData.contactNumber || !contactNumberPattern.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be exactly 10 digits.";
    }

    // Email validation
    if (!formData.email || !formData.email.includes('@') || formData.email.length < 11) {
      newErrors.email = "Email Address must include '@' and be at least 11 characters long.";
    }

    // Date validation
    const today = new Date();
    const selectedDate = new Date(formData.date);
    const twoMonthsLater = new Date(today.setMonth(today.getMonth() + 2));
    if (!formData.date || selectedDate < new Date() || selectedDate > twoMonthsLater) {
      newErrors.date = "Date must be within the next 2 months and not a past date.";
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = "You must select a time.";
    }

    // Services validation
    if (formData.services.length === 0) {
      newErrors.services = "You must select at least one service.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (editData._id) {
          // Editing existing appointment
          await axios.put(`/api/appointment/${editData._id}`, formData);
          alert("Your appointment has been updated.");
        } else {
          // Creating new appointment
          await axios.post('/api/appointment', formData);
          alert("Thank you! Your appointment has been booked.");
        }

        // Reset form data and errors
        setFormData({
          name: "",
          contactNumber: "",
          email: "",
          date: "",
          time: "",
          services: [],
          requests: "",
        });
        setErrors({});
        navigate('/MyAppointmentForm');
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("There was an error submitting your appointment. Please try again later.");
      }
    }
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
              onBlur={() => validateField('name', formData.name)}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              onBlur={() => validateField('contactNumber', formData.contactNumber)}
              required
            />
            {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateField('email', formData.email)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Date and Time Selection */}
          <div>
            <label>Select Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={() => validateField('date', formData.date)}
              required
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
          <div>
            <label>Select Time:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={() => validateField('time', formData.time)}
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
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
            {errors.time && <p className="error">{errors.time}</p>}
          </div>

          {/* Service Selection */}
          <div>
            <label>Select Services:</label>
            <div className="service-categories">
              {Object.entries(serviceOptions).map(([category, services]) => (
                <div key={category}>
                  <h4>{category}</h4>
                  {services.map((service) => (
                    <div key={service}>
                      <label>
                        <input
                          type="checkbox"
                          id={service}
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        {service} - {servicePrices[service]} LKR
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              {errors.services && <p className="error">{errors.services}</p>}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label>Any Special Requests?</label>
            <textarea
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              placeholder="Let us know if you have any special requests..."
            />
          </div>

          {/* Total Cost */}
          <div>
            <h3>Total Cost: {totalCost.toLocaleString()} LKR</h3>
          </div>

          {/* Submit Button */}
          <button type="submit">
            {editData._id ? "Update Appointment" : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
