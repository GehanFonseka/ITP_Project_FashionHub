import React, { useState, useEffect } from "react";
import './AppointmentForm.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const appointments = [];


const bookAppointment = (serviceCategory, date, time) => {
  const existingAppointment = appointments.find(appointment =>
    appointment.serviceCategory === serviceCategory &&
    appointment.date === date &&
    appointment.time === time
  );

  return existingAppointment ? {
    success: false,
    message: `Cannot book appointment. ${serviceCategory} is already booked at ${time} on ${date}.`
  } : { success: true };
};

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData || {};


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
  const [serviceOptions, setServiceOptions] = useState({});
  const [servicePrices, setServicePrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);




  useEffect(() => {

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const options = {};
        const prices = {};
        data.forEach(service => {
          if (!options[service.category]) {
            options[service.category] = [];
          }
          options[service.category].push(service.name);
          prices[service.name] = service.price;
        });
        setServiceOptions(options);
        setServicePrices(prices);

        const initialTotalCost = editData.services.reduce((sum, service) => sum + (prices[service] || 0), 0);
        setTotalCost(initialTotalCost);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const newTotalCost = formData.services.reduce((sum, service) => sum + (servicePrices[service] || 0), 0);
    setTotalCost(newTotalCost);
  }, [formData.services, servicePrices]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData(prevFormData => ({
        ...prevFormData,
        services: checked
          ? [...prevFormData.services, value]
          : prevFormData.services.filter(service => service !== value),
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));


      validateField(name, value);
    }
  };
  const handleServiceChange = (service) => {
    const serviceCategory = Object.keys(serviceOptions).find(category =>
      serviceOptions[category].includes(service)
    );

    const selectedCategories = new Set(formData.services.map(s => {
      return Object.keys(serviceOptions).find(category => serviceOptions[category].includes(s));
    }));


    if (selectedCategories.size > 0 && !selectedCategories.has(serviceCategory)) {
      alert("You can only select multiple services from the same category.");
      return;
    }

    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];

    setFormData(prevFormData => ({
      ...prevFormData,
      services: updatedServices,
    }));


    const newTotalCost = updatedServices.reduce((sum, service) => sum + (servicePrices[service] || 0), 0);
    setTotalCost(newTotalCost);
  };



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
        const contactNumberPattern = /^0\d{9}$/;
        newErrors.contactNumber = !value || !contactNumberPattern.test(value)
          ? "Contact Number must be exactly 10 digits, start with '0', and contain only numbers."
          : "";
        break;

      case "email":

        const gmailPattern = /^[a-zA-Z0-9](?:\.?[a-zA-Z0-9]){5,}@gmail\.com$/;
        newErrors.email = !value || !gmailPattern.test(value)
          ? "Please enter a valid Email address"
          : "";
        break;


      case "date":
        const today = new Date();
        const selectedDate = new Date(value);
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
        twoMonthsLater.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        newErrors.date =
          !value || selectedDate < today || selectedDate > twoMonthsLater
            ? "Date must be within the next 2 months and not a past date."
            : "";
        break;

      case "time":
        if (!value) {
          newErrors.time = "You must select a time.";
        } else {
          // Additional validation when date is today
          const selectedDate = new Date(formData.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate.toDateString() === today.toDateString()) {
            // Parse the selected time
            const [timeString, ampm] = value.split(" ");
            let [hours, minutes] = timeString.split(":");
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            if (ampm === "PM" && hours !== 12) {
              hours += 12;
            } else if (ampm === "AM" && hours === 12) {
              hours = 0;
            }

            const selectedTime = new Date();
            selectedTime.setHours(hours, minutes, 0, 0);

            const currentTime = new Date();

            const timeDifference = (selectedTime - currentTime) / (1000 * 60 * 60);

            if (timeDifference < 3) {
              newErrors.time =
                "For today's appointments, please select a time at least 3 hours from now.";
            } else {
              newErrors.time = "";
            }
          } else {
            newErrors.time = "";
          }
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const contactNumberPattern = /^\d{10}$/;

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
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    twoMonthsLater.setHours(0, 0, 0, 0);

    if (
      !formData.date ||
      selectedDate < today ||
      selectedDate > twoMonthsLater
    ) {
      newErrors.date =
        "Date must be within the next 2 months and not a past date.";
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = "You must select a time.";
    } else {
      if (selectedDate.toDateString() === today.toDateString()) {
        // Parse the selected time
        const [timeString, ampm] = formData.time.split(" ");
        let [hours, minutes] = timeString.split(":");
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);

        if (ampm === "PM" && hours !== 12) {
          hours += 12;
        } else if (ampm === "AM" && hours === 12) {
          hours = 0;
        }

        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0, 0);

        const currentTime = new Date();

        const timeDifference = (selectedTime - currentTime) / (1000 * 60 * 60); // Difference in hours

        if (timeDifference < 3) {
          newErrors.time =
            "For today's appointments, please select a time at least 3 hours from now.";
        }
      }
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
        const appointmentConflict = bookAppointment(formData.services.join(', '), formData.date, formData.time);
        if (!appointmentConflict.success) {
          alert(appointmentConflict.message);
          return;
        }


        const appointmentData = {
          ...formData,
          totalCost: totalCost,
        };

        if (editData._id) {
          // Editing an existing appointment
          await axios.put(`/api/appointment/${editData._id}`, formData);
          alert("Your appointment has been updated.");
        } else {
          // Creating a new appointment
          await axios.post('/api/appointment', appointmentData);
          alert("Thank you! Your appointment has been booked.");
        }

        // Reset form data after submission
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
        setTotalCost(0);
        navigate('/MyAppointmentForm');
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("There was an error submitting your appointment. Please try again later.");
      }
    }
  };


  // Calculate the total cost of selected services in LKR
  const totalCostLKR = formData.services.reduce((sum, service) => sum + (servicePrices[service] || 0), 0);

  return (
    <div className="appointment-form-container">
      <div className="form-column">
        <h2 style={{
          fontSize: '2.5rem',
          color: '#E76F51',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.5',
        }}>
          Book Your Appointment
        </h2>

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
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={() => validateField('date', formData.date)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #ccc',
                borderRadius: '8px',
                marginBottom: '20px',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                color: '#333',
                fontFamily: "'Roboto', sans-serif",
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
          <div>
            <label>Time:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={() => validateField('time', formData.time)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid #ccc',
                borderRadius: '8px',
                marginBottom: '20px',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                color: '#333',
                fontFamily: "'Roboto', sans-serif",
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <option value="">Select Time</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
            </select>
            {errors.time && <p className="error">{errors.time}</p>}
          </div>

          {/* Special Requests */}


          <div style={{ marginBottom: '20px' }}>
            <label>Special Requests:</label>
            <textarea
              name="requests"
              value={formData.requests}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div>
            <h3 style={{
              color: '#5C646C',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.5',
              marginTop: '30px',
              marginBottom: '20px',
            }}>
              Total Cost: <span style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}>
                LKR {totalCostLKR.toFixed(2)}
              </span>
            </h3>
            <button type="submit">Book Appointment</button>
          </div>
        </form>
      </div>

      <div className="services-column">
        <h2 style={{
          fontSize: '2.1rem',
          color: '#5C646C',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '20px',
        }}>
          Choose Your Services:
        </h2>

        <div id="services" className="services">
          {loading ? (
            <p>Loading...</p>
          ) : (
            Object.keys(serviceOptions).map(category => (
              <div key={category} className="service-category">
                <h3 style={{
                  fontWeight: '600',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                }}>{category}</h3>
                {serviceOptions[category].map(service => (
                  <div key={service} className="service-item">
                    <input
                      type="checkbox"
                      id={service}
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    <label htmlFor={service} style={{
                      marginLeft: '8px',
                      color: '#ffffff', fontSize: '1.2rem', fontFamily: "sans-serif"
                    }}>
                      {service} - LKR {servicePrices[service]?.toFixed(0)}
                    </label>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        {errors.services && <p className="error">{errors.services}</p>}
      </div>
    </div>
  );

};

export default AppointmentForm