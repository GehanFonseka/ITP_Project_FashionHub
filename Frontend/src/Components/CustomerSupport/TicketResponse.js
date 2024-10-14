import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; 

import {
  FaPaperPlane,
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  
} from "react-icons/fa";
import axios from "axios";
import { format, parseISO } from "date-fns";
import "animate.css"; 

const TicketResponse = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeSort, setTimeSort] = useState("desc");
  const [formError, setFormError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets");
        setTickets(response.data);
        setFilteredTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error.message);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    let updatedTickets = [...tickets];

    // Filter by status
    if (statusFilter !== "All") {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.status === statusFilter
      );
    }

    // Filter by shop (search query)
    if (searchQuery) {
      updatedTickets = updatedTickets.filter((ticket) => 
        ticket.shop && ticket.shop.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    // Sort by time
    updatedTickets.sort((a, b) => {
      const timeA = new Date(a.createdDate).getTime();
      const timeB = new Date(b.createdDate).getTime();
      return timeSort === "asc" ? timeA - timeB : timeB - timeA;
    });

    setFilteredTickets(updatedTickets);
  }, [statusFilter, timeSort, searchQuery, tickets]);

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
    setFormError(""); 
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    if (!selectedTicket || !response || !status) {
      setFormError("Please fill out all required fields.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/tickets/${selectedTicket._id}`,
        { response, status }
      );
      setTickets(
        tickets.map((ticket) =>
          ticket._id === selectedTicket._id
            ? { ...ticket, response, status }
            : ticket
        )
      );
      closeModal();
    } catch (error) {
      console.error("Failed to update ticket:", error.message);
    }
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setResponse(ticket.response || "");
    setStatus(ticket.status || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-yellow-500" />;
      case "Processing":
        return <FaExclamationTriangle className="text-orange-500" />;
      case "Resolved":
        return <FaCheckCircle className="text-green-500" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
<div className="w-full mx-0 p-2 mt-[90px] pb-10 pl-8 pr-8">
  <h1 className="text-4xl font-russo mb-8 text-primary">Respond to Tickets</h1>

  {/* Search Bar */}
  <div className="mb-6">
    <label className="block mb-2 font-semibold text-secondary"></label>
    <div className="relative max-w-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter Shop"
        className="w-full p-2 pr-12 border border-secondary rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
      />
      <FaSearch 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" 
        size={16} 
      />
    </div>
  </div>

  <div className="flex space-x-4 mb-6">
    {/* Status Filter */}
    <div>
      <label className="block mb-2 font-semibold text-secondary">Filter by Status</label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full p-2 border border-secondary rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Resolved">Resolved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>

    {/* Time Sort */}
    <div>
      <label className="block mb-2 font-semibold text-secondary">Sort by Time</label>
      <select
        value={timeSort}
        onChange={(e) => setTimeSort(e.target.value)}
        className="w-full p-2 border border-secondary rounded bg-gray-100 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>

  {/* Ticket Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredTickets.map((ticket) => (
      <div
        key={ticket._id}
        className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeIn"
      >
        <div className="p-6">
          <h2 className="text-2xl font-russo mb-4 flex items-center space-x-2">
            {getStatusIcon(ticket.status)}
            <span className="text-lg font-medium">{ticket.subject}</span>
          </h2>
          <p className="mb-4 text-gray-700 text-sm bg-gray-100 p-3 rounded-md border border-gray-300 shadow-inner">
            {ticket.issueDescription}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong className="text-gray-800">Date:</strong>{" "}
            <span className="bg-gray-100 p-2 rounded-lg border border-gray-300 text-secondary font-medium">
              {format(parseISO(ticket.createdDate), "MMMM d, yyyy 'at' h:mm a")}
            </span>
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => openModal(ticket)}
              className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 flex items-center space-x-2"
              title="Respond to Ticket"
            >
              <FaPaperPlane size={20} />
              <span>Respond</span>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Modal */}
  {isModalOpen && selectedTicket && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate__animated animate__fadeIn animate__faster">
      <div className="bg-white text-dark p-6 rounded-2xl shadow-2xl max-w-xl w-full border-2 border-primary transition-transform duration-300 hover:shadow-2xl animate__animated animate__fadeIn animate__faster">
        <h2 className="text-3xl font-russo mb-10 flex items-center space-x-2">
          {getStatusIcon(selectedTicket.status)}
          <span>Respond to Ticket: {selectedTicket.subject}</span>
        </h2>
        <p className="mb-2">
          <strong>Description:</strong> {selectedTicket.issueDescription}
        </p>
        <p className="mb-2">
          <strong>Customer Name:</strong> {selectedTicket.customerName}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {selectedTicket.email}
        </p>
        <p className="mb-2">
          <strong>Phone Number:</strong> {selectedTicket.phoneNumber}
        </p>
        <p className="mb-2">
          <strong>Shop:</strong> {selectedTicket.shop || "N/A"}
        </p>

        {/* Response Form */}
        <div className="mt-4">
          <label className="block mb-2 font-semibold text-secondary">Response</label>
          <textarea
            value={response}
            onChange={handleResponseChange}
            className={`w-full p-2 border rounded bg-gray-100 transition-all duration-300 ${formError ? "border-red-500" : "border-secondary"}`}
            rows="4"
            placeholder="Write your response here..."
          />
          {formError && <p className="text-red-500 mt-2 text-sm">{formError}</p>}
        </div>
        <div className="mt-4">
          <label className="block mb-2 font-semibold text-secondary">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className={`w-full p-2 border rounded bg-gray-100 transition-all duration-300 ${formError ? "border-red-500" : "border-secondary"}`}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
            title="Update Ticket"
          >
            <FaPaperPlane size={20} />
            <span>Update</span>
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-dark rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
            title="Close Modal"
          >
            <FaTimesCircle size={20} />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default TicketResponse;
