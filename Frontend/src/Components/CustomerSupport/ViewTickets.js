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
import "animate.css"; 

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
    const lineHeight = 15; 
    let currentY = 45;
     
  

    doc.setFontSize(22);
    doc.setFont("Russo One", "bold"); 
    doc.setTextColor("#E76F51"); 
    doc.text("FashionHub", 105, 20, { align: "center" }); 
    
  // Add a horizontal line under the title
  doc.setDrawColor("#E76F51"); 
  doc.setLineWidth(0.6);            
  doc.line(15, 25, 195, 25);      
    
    doc.setFontSize(16); 
    doc.setFont("Russo One"); 
    doc.setTextColor("#E76F51");
    doc.text("Ticket Details", 105, currentY, { align: "center" });
    currentY += lineHeight + 7; 
  
    
    const bullet = "\u2022 ";
  
    // Set uniform font size and color for all text
    doc.setFontSize(12);
    doc.setFont("Saira");
    doc.setTextColor("#000000");
  
    
    doc.text(`${bullet}Subject:`, 45, currentY);
    doc.text(ticket.subject, 80, currentY);
    currentY += lineHeight; 
    
    doc.text(`${bullet}Description:`, 45, currentY);
    doc.text(ticket.issueDescription, 80, currentY, { maxWidth: 130 });
    currentY += lineHeight;
  
    
    doc.text(`${bullet}Customer Name:`, 45, currentY);
    doc.text(ticket.customerName, 80, currentY);
    currentY += lineHeight;
  
    
    doc.text(`${bullet}E-mail:`, 45, currentY);
    doc.text(ticket.email, 80, currentY);
    currentY += lineHeight;

    
    
    doc.text(`${bullet}Phone Number:`, 45, currentY);
    doc.text(ticket.phoneNumber, 80, currentY);
    currentY += lineHeight;
  
    
    doc.text(`${bullet}Shop :`, 45, currentY);
    doc.text(ticket.shop || "N/A", 80, currentY);
    currentY += lineHeight;
  
    
    doc.text(`${bullet}Status:`, 45, currentY);
    doc.text(ticket.status, 80, currentY);
    currentY += lineHeight;
  
    
    doc.text(`${bullet}Response:`, 45, currentY);
    doc.text(ticket.response || "No response available.", 80, currentY, { maxWidth: 130 });
  
    // Save the PDF
    doc.save(`ticket_${ticket.subject}.pdf`);
  };
  
  

  return (
    <div className="container mx-auto p-6 mb-56" style={{ marginTop: '90px' }}> 
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
              <p className="text-gray-700">{selectedTicket.shop || "N/A"}</p>
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
