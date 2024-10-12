import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaTrash,
  FaDownload,
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";
import { format, parseISO } from "date-fns";
import "animate.css"; // Ensure animate.css is installed for animation

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error.message);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axios.delete(`http://localhost:3000/api/tickets/${id}`);
        setTickets(tickets.filter((ticket) => ticket._id !== id));
      } catch (error) {
        console.error("Failed to delete ticket:", error.message);
      }
    }
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const downloadPDF = (ticket) => {
    const doc = new jsPDF();
    const lineHeight = 10; // Consistent line spacing
    let currentY = 25; // Starting Y position after the title
  
    // Add store name at the top - Larger size and bold
    doc.setFontSize(22); // Increased font size for "FashionHub"
    doc.setFont("Russo One", "bold"); // Use bold for store name
    doc.setTextColor("#E76F51"); // Primary color
    doc.text("FashionHub", 105, 15, { align: "center" }); // Centered store name
  
    // Add title below the store name
    doc.setFontSize(16); // Set a smaller size for the title
    doc.setFont("Russo One"); // Regular font for title
    doc.setTextColor("#E76F51");
    doc.text("Ticket Details", 105, currentY, { align: "center" });
    currentY += lineHeight; // Move down for next content
  
    // Define bullet point
    const bullet = "\u2022 ";
  
    // Set uniform font size and color for all text
    doc.setFontSize(12);
    doc.setFont("Saira");
    doc.setTextColor("#000000");
  
    // Add subject
    doc.text(`${bullet}Subject:`, 10, currentY);
    doc.text(ticket.subject, 45, currentY);
    currentY += lineHeight; // Move down for next line
  
    // Add description
    doc.text(`${bullet}Description:`, 10, currentY);
    doc.text(ticket.issueDescription, 45, currentY, { maxWidth: 140 });
    currentY += lineHeight;
  
    // Add customer name
    doc.text(`${bullet}Customer Name:`, 10, currentY);
    doc.text(ticket.customerName, 45, currentY);
    currentY += lineHeight;
  
    // Add email
    doc.text(`${bullet}E-mail:`, 10, currentY);
    doc.text(ticket.email, 45, currentY);
    currentY += lineHeight;

    
    // Add phone number
    doc.text(`${bullet}Phone Number:`, 10, currentY);
    doc.text(ticket.phoneNumber, 45, currentY);
    currentY += lineHeight;
  
    // Add shop ID
    doc.text(`${bullet}Shop :`, 10, currentY);
    doc.text(ticket.shopID || "N/A", 45, currentY);
    currentY += lineHeight;
  
    // Add status
    doc.text(`${bullet}Status:`, 10, currentY);
    doc.text(ticket.status, 45, currentY);
    currentY += lineHeight;
  
    // Add response
    doc.text(`${bullet}Response:`, 10, currentY);
    doc.text(ticket.response || "No response available.", 45, currentY, { maxWidth: 140 });
  
    // Save the PDF
    doc.save(`ticket_${ticket.subject}.pdf`);
  };
  
  

  return (
    <div className="container mx-auto p-6 mb-56" style={{ marginTop: '90px' }}> {/* Adjusted margin-top here */}
      <h1 className="text-4xl font-russo mb-8 text-primary">View Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeIn"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-russo text-primary flex items-center space-x-2">
                  {getStatusIcon(ticket.status)}
                  <span>{ticket.subject}</span>
                </h2>
                <p
                  className={`text-sm font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </p>
              </div>
              <p className="mb-3 text-gray-700">{ticket.issueDescription}</p>
              <p className="text-sm text-gray-600 mb-4">
                <strong className="text-gray-800">Date:</strong>{" "}
                <span className="bg-gray-100 p-2 rounded-lg border border-gray-300 text-secondary font-medium">
                  {format(
                    parseISO(ticket.createdDate),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </span>
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => openModal(ticket)}
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 flex items-center space-x-2"
                  title="View Details"
                >
                  <FaEye size={20} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 transition-colors duration-300 flex items-center space-x-2"
                  title="Delete Ticket"
                >
                  <FaTrash size={20} />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => downloadPDF(ticket)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors duration-300 flex items-center space-x-2"
                  title="Download PDF"
                >
                  <FaDownload size={20} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
          className="relative bg-white text-dark p-1 rounded-2xl shadow-2xl  max-w-xl w-full max-h-[80vh] overflow-y-auto animate__animated animate__fadeIn animate__faster"
          style={{ marginTop: '100px' }}
        >
            <div className="mb-6 ml-3 mt-3">
              <h2 className="text-3xl font-russo text-primary flex items-center space-x-2">
                {getStatusIcon(selectedTicket.status)}
                <span>{selectedTicket.subject}</span>
              </h2>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 ">
                Description
              </h3>
              <p className="text-gray-700">{selectedTicket.issueDescription}</p>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Customer Name
              </h3>
              <p className="text-gray-700">{selectedTicket.customerName}</p>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                E-mail
              </h3>
              <p className="text-gray-700">{selectedTicket.email}</p>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Phone Number
              </h3>
              <p className="text-gray-700">{selectedTicket.phoneNumber}</p>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Shop 
              </h3>
              <p className="text-gray-700">{selectedTicket.shopID || "N/A"}</p>
            </div>
            <div className="mb-4 ml-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Status
              </h3>
              <p
                className={`text-sm font-medium ${getStatusColor(
                  selectedTicket.status
                )}`}
              >
                {selectedTicket.status}
              </p>
            </div>

            {selectedTicket.response ? (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 ml-3">
                <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-2">
                  Response
                </h3>
                <p>{selectedTicket.response}</p>
              </div>
            ) : (
              <p className="mt-4 text-gray-500 ml-3">No response available.</p>
            )}

            <div className="flex justify-end mt-6 space-x-4 mb-3 mr-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
              >
                Close
              </button>
            </div>
            </div>
          
        </div>
      )}
    </div>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <FaClock className="text-yellow-500" />;
    case "Resolved":
      return <FaCheckCircle className="text-green-500" />;
    case "Rejected":
      return <FaTimesCircle className="text-red-500" />;
    default:
      return <FaExclamationTriangle className="text-orange-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Resolved":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-orange-500";
  }
};

export default ViewTickets;
