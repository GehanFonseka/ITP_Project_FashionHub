import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const TicketRaisingForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    issueType: "",
    issueDescription: "",
    subject: "",
    shop: "",
    filePath: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  // Validate individual field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "customerName":
        if (!value.trim()) {
          newErrors.customerName = "Customer name is required. (e.g. John Doe)";
        } else if (/\d/.test(value)) {
          newErrors.customerName = "Customer name must not contain any numbers.(e.g. John Doe)";
        } else if (!/^[A-Z]/.test(value)) {
          newErrors.customerName = "First letter must be capital.(e.g. John Doe)";
        } else {
          newErrors.customerName = "";
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required. (e.g. johndoe@gmail.com)" ;
        } else if (value !== value.toLowerCase()) {
          newErrors.email = "Email must be all lowercase.(e.g. johndoe@gmail.com)";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address.(e.g. johndoe@gmail.com)";
        } else {
          newErrors.email = "";
        }
        break;
      case "phoneNumber":
        if (!value.trim()) {
          newErrors.phoneNumber = "Phone number is required.(e.g. 1234567890)";
        } else if (!/^\d+$/.test(value)) {
          newErrors.phoneNumber = "Phone number can't contain letters.(e.g. 1234567890)";
        }else if (!/^\d{10}$/.test(value)) {
          newErrors.phoneNumber = "Phone number must be exactly 10 digits .(e.g. 1234567890)";
        } else {
          newErrors.phoneNumber = "";
        }
        break;
      case "issueType":
        newErrors.issueType = !value ? "Issue type is required." : "";
        break;
      case "subject":
        if (!value.trim()) {
          newErrors.subject = "Subject is required.";
        } else if (value.length < 5) {
          newErrors.subject = "Subject must be at least 5 characters.";
        } else {
          newErrors.subject = "";
        }
        break;
      case "shop":
          newErrors.shop = !value ? "Issue type is required." : "";
          break;
      case "issueDescription":
        if (!value.trim()) {
          newErrors.issueDescription = "Issue description is required.";
        } else if (value.length < 10) {
          newErrors.issueDescription = "Issue description must be at least 10 characters.";
        } else {
          newErrors.issueDescription = "";
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
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phoneNumber") {
      setIsPhoneValid(/^\d{10}$/.test(value)); 
    }

    validateField(name, value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const dataToSubmit = { ...formData };

    try {
      await axios.post("http://localhost:3000/api/tickets", dataToSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        handleCancel();
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to submit ticket. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      customerName: "",
      email: "",
      phoneNumber: "",
      issueType: "",
      issueDescription: "",
      subject: "",
      shop: "",
      filePath: "",
    });
    setErrorMessage("");
    setErrors({});
    setIsPhoneValid(false);
    setFileUrl("");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-light min-h-screen font-saira transition-all duration-300" style={{ marginTop: '70px' }}>
      <h1 className="text-4xl font-russo mb-6 text-secondary">Customer Care</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-primary transition-transform duration-300 hover:shadow-2xl"
      >
        <h2 className="text-center text-lg font-semibold mb-4 bg-primary py-2 rounded-t-md text-white">
          Raise a Ticket
        </h2>

        <div className="grid grid-cols-1 gap-4">
          
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.customerName ? "border-red-500" : "border-secondary"
              }`}
              placeholder="Enter your name"
              required
            />
            {errors.customerName && <span className="text-red-500 text-sm">{errors.customerName}</span>}
          </div>

          
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-secondary"
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

         
          <div className="flex flex-col mb-4 relative">
            <label className="text-secondary mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.phoneNumber ? "border-red-500" : "border-secondary"
              } pr-10`}
              placeholder="Enter your phone number"
              required
            />
            {isPhoneValid && (
              <FaCheckCircle className="absolute right-2 top-12 transform -translate-y-1/2 text-green-500" />
            )}
            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
          </div>

          
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Issue Type</label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.issueType ? "border-red-500" : "border-secondary"
              }`}
              required
            >
              <option value="">Select Issue Type</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Oder Update">Oder Update</option>
              <option value="Wrong item received">Wrong item received</option>
              <option value="Billing Issue">Billing Issue</option>
              <option value="Missing item from oder">Missing item from oder</option>
              <option value="Other">Other</option>
            </select>
            {errors.issueType && <span className="text-red-500 text-sm">{errors.issueType}</span>}
          </div>

          {/* Subject */}
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.subject ? "border-red-500" : "border-secondary"
              }`}
              placeholder="Enter the subject"
              required
            />
            {errors.subject && <span className="text-red-500 text-sm">{errors.subject}</span>}
          </div>

             {/* Shop Selection */}
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Shop</label>
            <select
              name="shop"
              value={formData.shop}
              onChange={handleChange}
              className="border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary border-secondary"
            >
              <option value="">Select Shop</option>
              <option value="Clothing">Clothing</option>
              <option value="Saloon">Saloon</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.shop && <span className="text-red-500 text-sm">{errors.shop}</span>}
          </div>

          
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">Issue Description</label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              className={`border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary ${
                errors.issueDescription ? "border-red-500" : "border-secondary"
              }`}
              placeholder="Describe the issue in detail"
              required
            />
            {errors.issueDescription && <span className="text-red-500 text-sm">{errors.issueDescription}</span>}
          </div>

         

          {/* File Upload */}
          <div className="flex flex-col mb-4">
            <label className="text-secondary mb-2">File Upload (optional)</label>
            <input
              type="file"
              name="filePath"
              onChange={(e) => {
                setFileUrl(URL.createObjectURL(e.target.files[0]));
                setShowFileModal(true);
              }}
              className="border p-2 rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
            />
            {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">View Uploaded File</a>}
          </div>

           
          <div className="flex justify-end space-x-4 mt-4"> {/* Flexbox with space between buttons */}
  <button
    type="submit"
    className="bg-primary text-white py-2 px-6 rounded hover:bg-secondary transition-all duration-300"
  >
    Submit
  </button>
  <button
    type="button"
    onClick={handleCancel}
    className="bg-secondary text-white py-2 px-6 rounded hover:bg-primary transition-all duration-300"
  >
    Clear
  </button>
</div>

        </div>

        {/* Success or Error Message */}
        {submitted && <p className="text-green-500 text-center mt-4">Ticket submitted successfully!</p>}
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TicketRaisingForm;
