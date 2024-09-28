import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";


const Contact = () => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here (send to backend or display a success message)
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-16 p-6 max-w-5xl mx-auto bg-gradient-to-b from-gray-200 to-gray-100 min-h-screen font-saira transition-all duration-300"style={{ marginTop: '45px' }}>
    {/* Section 1: Buttons - Grid Layout for Two Columns */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button
        className="bg-primary text-white py-3 text-md font-bold rounded-lg shadow-md transform transition-transform hover:scale-105 w-full"
        onClick={() => (window.location.href = "/ticket")}
      >
        Raise a Ticket
      </button>
      <button
        className="bg-secondary text-white py-3 text-md font-bold rounded-lg shadow-md transform transition-transform hover:scale-105 w-full"
        onClick={() => (window.location.href = "/view")}
      >
        View Tickets
      </button>
    </div>
  
    {/* Section 2: Contact Information */}
    <div className="bg-white p-5 rounded-lg shadow-lg border-2 border-gray-300 transition-transform duration-300 hover:shadow-xl mb-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-3">
        Have any questions or need assistance? Reach out to us below or use the
        contact form.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Email:</span> fashionhub@gmail.com
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Phone:</span> +123 456 7890
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> 1234/ abc Street,
            Colombo, Sri Lanka
          </p>
        </div>
        <div className="flex space-x-4 text-primary text-2xl justify-center items-center">
          <a href="#" className="hover:text-secondary">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-secondary">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-secondary">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-secondary">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  
    {/* Section 3: Contact Form */}
    <div className="bg-white p-5 rounded-lg shadow-lg border-2 border-gray-300 transition-transform duration-300 hover:shadow-xl mb-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Send us a message</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
              placeholder="Your name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
              placeholder="Your email"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
            placeholder="Your message"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded shadow-md transform transition-transform hover:scale-105"
        >
          Send Message
        </button>
      </form>
    </div>
  
    {/* Section 4: Frequently Asked Questions */}
    <div className="bg-white p-5 rounded-lg shadow-lg border-2 border-gray-300 transition-transform duration-300 hover:shadow-xl mb-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-primary">How do I raise a ticket?</h3>
          <p className="text-gray-600">
            You can raise a ticket by clicking the "Raise a Ticket" button and
            filling out the form.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">How long does it take to get a response?</h3>
          <p className="text-gray-600">
            Our team typically responds within 24-48 hours. If you don't hear from us, feel free to follow up.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Can I view my previous tickets?</h3>
          <p className="text-gray-600">
            Yes, you can view your ticket history by clicking the "View Tickets" button on this page.
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Contact;
