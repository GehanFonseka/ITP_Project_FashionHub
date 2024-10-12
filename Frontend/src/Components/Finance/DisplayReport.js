import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaDownload, FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const DisplayReport = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ year: "" });
  const navigate = useNavigate();
  const reportRef = useRef(); 

  

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleCardClick = (report) => {
    setSelectedReport(report);
  };

  const handleClosePopUp = () => {
    setSelectedReport(null);
  };

  const handleEditClick = (reportId) => {
    navigate(`/editreport/${reportId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`);
      setReports(reports.filter((report) => report._id !== id));
      setSelectedReport(null);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handlePrint = async () => {
    if (selectedReport) {
      console.log("Generating PDF for:", selectedReport);
      try {
        // Fetch the complete report details from the backend
        const response = await axios.get(
          `http://localhost:5000/api/reports/${selectedReport._id}`
        );
        const report = response.data;
  
        // Determine the shop name
        const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
        report.sellerNo === 1010 ? "Shoes" :
        report.sellerNo === 1011 ? "Accessories" :
        report.sellerNo === 1000 ? "Saloon" :
        "Unknown Shop"; 
  
        // Log the fetched report data
        console.log("Fetched Report Data:", report);
  
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });
  
        // Get today's date and format it
        const today = new Date();
        const formattedDate = `Released Date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
        // Add today's date in the left corner
        doc.setFontSize(12);
        doc.setTextColor(92, 100, 108);
        doc.text(formattedDate, 20, 20); // Position at (20, 20)
  
        // Set custom font styles for title
        doc.setFont("Russo One", "normal");
        doc.setFontSize(24);
        doc.setTextColor(231, 111, 81);
        doc.text("FashionHub", 300, 50, { align: "center" });
  
        // Header for the report
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(231, 111, 81); 
        doc.text(
          `Balance Sheet for the Month of ${report.month} ${report.year}`,
          300,
          90,
          { align: "center" }
        );
        doc.rect(20, 70, 560, 40, "F"); 
  
        // Switch to regular font for content
        doc.setFont("Saira", "normal");
        doc.setFontSize(14);
        doc.setTextColor(92, 100, 108);
  
        // Report Details Section
        autoTable(doc, {
          startY: 120,
          head: [["Report Details"]],
          body: [
            [`Shop Name: ${sellerNo}`],
            [`Month: ${report.month}`],
            [`Year: ${report.year}`],
          ],
          theme: "striped",
          headStyles: { fillColor: [231, 111, 81] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Income Section
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Income"]],
          body: [[`Total Income: Rs ${report.totalIncome.toFixed(2)}`]],
          theme: "striped",
          headStyles: { fillColor: [231, 111, 81] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Balance Sheet Section
        const expensesBody = Object.entries(report.expenses)
          .filter(([key, value]) => value != null) // Filter out null or undefined
          .map(([key, value]) => [
            `${key}: Rs. ${value ? value.toFixed(2) : "0.00"}`, // Default to 0.00 if value is empty
          ]);
  
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Balance Sheet"]],
          body: expensesBody.length ? expensesBody : [["No expenses available"]],
          theme: "striped",
          headStyles: { fillColor: [231, 111, 81] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Petty Cash Section
        const pettyCashBody = Object.entries(report.pettyCash)
          .filter(([key, value]) => value != null) // Filter out null or undefined
          .map(([key, value]) => [
            `${key}: Rs. ${value ? value.toFixed(2) : "0.00"}`, // Default to 0.00 if value is empty
          ]);
  
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Petty Cash"]],
          body: pettyCashBody.length ? pettyCashBody : [["No petty cash available"]],
          theme: "striped",
          headStyles: { fillColor: [231, 111, 81] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Net Profit Section
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Net Profit"]],
          body: [[`Net Profit: Rs ${report.netProfit || 0}`]], // Default to 0 if net profit is undefined
          theme: "striped",
          headStyles: { fillColor: [231, 111, 81] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Save the PDF with custom name
        doc.save(`Report_${report.month}_${report.year}.pdf`);
        setSelectedReport(null);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.log("No report selected");
    }
  };
  
  

  const ReportCard = ({ report }) => {
    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert month number to month name
    const monthName = months[report.month - 1] || "Unknown Month"; 

    // Assuming report is passed as a prop or fetched earlier in the component
        const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
        report.sellerNo === 1010 ? "Shoes" :
        report.sellerNo === 1011 ? "Accessories" :
        report.sellerNo === 1000 ? "Saloon" :
        "Unknown Shop"; // Default case if shopID doesn't match

    return (
      <div
        className="bg-[#D9D9D9] p-4 mt-12 rounded-md shadow-md border-2 border-[#C0C0C0] cursor-pointer relative max-w-sm mx-auto" 
      >
        <h3 className="text-lg font-semibold mb-2 text-[#5C646C] font-russo">
          Report for {monthName} {report.year}
        </h3>
        <div className="flex justify-between mb-2">
          <span className="text-[#5C646C]">Shop Name:</span>
          <span>{sellerNo}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[#5C646C]">Total Income:</span>
          <span>{report.totalIncome}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[#5C646C]">Net Profit:</span>
          <span>{report.netProfit}</span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleCardClick(report);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(report._id);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleDelete(report._id);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const FullReport = ({ report, onClose, onDownload }) => {
    const reportRef = useRef();

    const getMonthName = (monthNumber) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames[monthNumber - 1];
    };


    const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
        report.sellerNo === 1010 ? "Shoes" :
        report.sellerNo === 1011 ? "Accessories" :
        report.sellerNo === 1000 ? "Saloon" :
        "Unknown Shop"; 


    /*----view report section-----*/
    return (
      <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4">

        <div
          className="bg-[#F4F4F4] p-6 rounded-lg shadow-lg w-full max-w-4xl border-[5px] border-[#2E3192] relative overflow-y-auto max-h-[95vh] max-w-[125vh]"
          ref={reportRef} 
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Close
          </button>

          {/* Title */}
          <h2 className="text-center text-white text-lg font-semibold mb-4 bg-[#E76F51] py-2 rounded-t-md font-russo">
            Balance Sheet for the Month of {getMonthName(report.month)}{" "}
            {report.year}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {/* Shop ID, Month, and Year Section */}
            <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0]">
              <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
                Report Details
              </h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#5C646C]">Shop ID</span>
                  <input
                    type="text"
                    value={sellerNo}
                    readOnly
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                    placeholder="Shop ID"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#5C646C]">Month</span>
                  <input
                    type="text"
                    value={getMonthName(report.month)}
                    readOnly
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                    placeholder="Month"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#5C646C]">Year</span>
                  <input
                    type="text"
                    value={report.year}
                    readOnly
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                    placeholder="Year"
                  />
                </div>
              </div>
            </div>

            {/* Income Section */}
            <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0]">
              <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
                Income
              </h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#5C646C]">Total Income</span>
                  <input
                    type="number"
                    value={report.totalIncome}
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                    placeholder="Amount"
                    readOnly
                  />
                </div>
              </div>

              {/* Expenses Section */}
              <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0]">
                <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
                  Balance Sheet
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Assets */}
                  <div className="bg-[#D9D9D9] p-4 rounded-md border-2 border-[#C0C0C0]">
                    <h5 className="text-md font-semibold mb-2 text-[#5C646C] font-russo">
                      Assets
                    </h5>
                    {["purchasingCost", "storeMaintenance"].map(
                      (expense, index) => (
                        <div key={index} className="flex flex-col mb-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[#5C646C]">
                              {expense
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </span>
                            <input
                              type="number"
                              value={report.expenses[expense] || ""}
                              readOnly
                              className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                              placeholder="Amount"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Liabilities */}
                  <div className="bg-[#D9D9D9] p-4 rounded-md border-2 border-[#C0C0C0]">
                    <h5 className="text-md font-semibold mb-2 text-[#5C646C] font-russo">
                      Liabilities
                    </h5>
                    {[
                      "electricityBill",
                      "internetBill",
                      "waterBill",
                      "employeeSalaries",
                      "marketingCost",
                    ].map((expense, index) => (
                      <div key={index} className="flex flex-col mb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[#5C646C]">
                            {expense
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <input
                            type="number"
                            value={report.expenses[expense] || ""}
                            readOnly
                            className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Petty Cash Section */}
              <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0] mt-4">
                <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
                  Petty Cash
                </h3>
                {[
                  "minorRepairs",
                  "transportationCost",
                  "bankFees",
                  "courierFees",
                  "officeSupplies",
                ].map((cash, index) => (
                  <div key={index} className="flex flex-col mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#5C646C]">
                        {cash
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                      <input
                        type="number"
                        value={report.pettyCash[cash] || ""}
                        readOnly
                        className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Net Profit Section */}
              <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0] mt-4">
                <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
                  Net Profit
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#5C646C]">Net Profit</span>
                  <input
                    type="number"
                    value={report.netProfit}
                    readOnly
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                    placeholder="Amount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Download PDF Button */}
          <button
            onClick={onDownload} 
            className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
          >
            <FaDownload size={20} />
          </button>
        </div>
      </div>
    );
  };

// Function to map shop name to shopID
const getShopIDFromName = (shopName) => {
  const lowerCaseShopName = shopName.toLowerCase();
  if (lowerCaseShopName === "clothing") return 1101;
  if (lowerCaseShopName === "shoes") return 1010;
  if (lowerCaseShopName === "accessories") return 5000;
  if (lowerCaseShopName === "saloon") return 1000;
  return ""; // return empty if no match
};

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; 

  /*-----without display card(other things)----------*/
  return (
    <div className="p-4">
        {/* Search n filters raw */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search by Shop Name or ID */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by Shop Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <FaSearch className="ml-2 text-gray-600" />
          </div>

        {/* Year Filter Dropdown */}
        <div className="flex items-center">
          <label htmlFor="yearFilter" className="mr-2 text-[#5C646C]">
            Year:
          </label>
          <select
            id="yearFilter"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Year</option>
            {["2022", "2023", "2024"].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Filter Dropdown */}
        <div className="flex items-center">
          <label htmlFor="monthFilter" className="mr-2 text-[#5C646C]">
            Month:
          </label>
          <select
            id="monthFilter"
            value={filters.month}
            onChange={(e) => {
              const monthIndex = Number(e.target.value); 
              setFilters({
                ...filters,
                month: monthIndex.toString(),
              });
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => {
              const monthNumber = index + 1;
              const isDisabled = 
                filters.year === currentYear.toString() && monthNumber > currentMonth; 
              
              return (
                <option key={month} value={monthNumber} disabled={isDisabled}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Report Cards Grid with search functionality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {reports
        .filter((report) => {
          // Normalize the search term for consistent comparison
          const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

          // Use the shop ID based on the shop name or return an empty string if no valid shop ID is found
          const shopID = getShopIDFromName(normalizedSearchTerm);

          // If a valid shop ID is found, use it; otherwise, fall back to the normalized search term
          const sellerno = shopID !== "" ? shopID : normalizedSearchTerm;

          // Perform filtering and ensure report.sellerno exists before calling toUpperCase
          return (
            (searchTerm
              ? report.sellerNo && report.sellerNo.toString().includes(sellerno.toString())
              : true) &&
            (filters.year ? report.year === filters.year : true) &&
            (filters.month ? report.month === filters.month : true)
          );
        })
        .map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div> 

      {/* Full Report Popup */}
      {selectedReport && (
        <FullReport
          report={selectedReport}
          onClose={handleClosePopUp}
          onDownload={handlePrint} 
        />
      )}
    </div>
  );
};

export default DisplayReport;
