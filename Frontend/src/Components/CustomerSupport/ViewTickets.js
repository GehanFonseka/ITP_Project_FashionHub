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
import 'jspdf-autotable';


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
    const lineHeight = 8; 
    let currentY = 45;
     
  

  const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here
        const imgWidth = 35;  
        const imgHeight = 15;  
        const pageWidth = doc.internal.pageSize.width;
        const centerX = (pageWidth - imgWidth) / 2;  

        
        doc.addImage(logo, 'PNG', centerX, 10, imgWidth, imgHeight);
    
    // Add table title
    currentY += imgHeight; 
    doc.setFontSize(16);
    doc.setFont("Saira", "bold");
    doc.text("Ticket Details", pageWidth / 2, currentY, { align: 'center' });
  
    currentY += lineHeight
    ; // Adjust Y position for the table start

    // Define table data
    const tableData = [
        ["Subject", ticket.subject],
        ["Description", ticket.issueDescription],
        ["Customer Name", ticket.customerName],
        ["E-mail", ticket.email],
        ["Phone Number", ticket.phoneNumber],
        ["Shop", ticket.shop || "N/A"],
        ["Status", ticket.status],
        ["Response", ticket.response || "No response available."]
    ];

    // Add table with headers and ticket details
    doc.autoTable({
        startY: currentY, 
        head: [['Field', 'Details']], 
        body: tableData, 
        theme: 'striped', 
        styles: { 
            font: "Saira", 
            fontSize: 12,
            cellPadding: 3,
            valign: 'middle',
            halign: 'left', 
            overflow: 'linebreak',
        },
        headStyles: { 
            fillColor: [139,0,0], 
            textColor: [255, 255, 255], 
            fontSize: 13,
        },
        columnStyles: {
            0: { cellWidth: 50, fontStyle: 'bold', }, 
            1: { cellWidth: 140 }, 
        }
    });

    // Save the PDF with ticket subject as file name
    doc.save(`ticket_${ticket.subject}.pdf`);
};
  
  

  return (
    <div className="container mx-auto p-6 mb-56 w-50" style={{ marginTop: '90px' }}> 
      <h1 className="text-4xl font-russo mb-8 text-primary">View Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-50">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className=" w-50 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeIn"
          >
            <div className="p-6">
              <div className="w-50 flex justify-between items-center mb-4">
                <h2 className="w-50 text-2xl font-russo text-primary flex items-center space-x-2">
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
