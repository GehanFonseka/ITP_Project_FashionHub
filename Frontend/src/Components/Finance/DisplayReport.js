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
        const response = await axios.get(
          `http://localhost:5000/api/reports/${selectedReport._id}`
        );
        const report = response.data;
  
        const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
        report.sellerNo === 1010 ? "Shoes" :
        report.sellerNo === 1011 ? "Accessories" :
        report.sellerNo === 1000 ? "Saloon" :
        "Unknown Shop"; 
  
        console.log("Fetched Report Data:", report);
  
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });
  
        const today = new Date();
        const formattedDate = `Released Date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here
        const imgWidth = 150;  
        const imgHeight = 50;  
        const pageWidth = doc.internal.pageSize.width;
        const centerX = (pageWidth - imgWidth) / 2;  

        
        doc.addImage(logo, 'PNG', centerX, 20, imgWidth, imgHeight); 
  
        doc.setFontSize(12);
        doc.setTextColor(92, 100, 108);
        doc.text(formattedDate, 20, 20); 
  
  
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
  
        doc.setFont("Saira", "normal");
        doc.setFontSize(14);
        doc.setTextColor(92, 100, 108);
  
        autoTable(doc, {
          startY: 120,
          head: [["Report Details"]],
          body: [
            [`Shop Name: ${sellerNo}`],
            [`Month: ${report.month}`],
            [`Year: ${report.year}`],
          ],
          theme: "striped",
          headStyles: { fillColor: [139,0,0] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Income Section
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Income"]],
          body: [[`Total Income: Rs ${report.totalIncome.toFixed(2)}`]],
          theme: "striped",
          headStyles: { fillColor: [139,0,0] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Balance Sheet Section
        const expensesBody = Object.entries(report.expenses)
          .filter(([key, value]) => value != null) 
          .map(([key, value]) => [
            `${key}: Rs. ${value ? value.toFixed(2) : "0.00"}`, 
          ]);
  
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Balance Sheet"]],
          body: expensesBody.length ? expensesBody : [["No expenses available"]],
          theme: "striped",
          headStyles: { fillColor: [139,0,0] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Petty Cash Section
        const pettyCashBody = Object.entries(report.pettyCash)
          .filter(([key, value]) => value != null) 
          .map(([key, value]) => [
            `${key}: Rs. ${value ? value.toFixed(2) : "0.00"}`, 
          ]);
  
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Petty Cash"]],
          body: pettyCashBody.length ? pettyCashBody : [["No petty cash available"]],
          theme: "striped",
          headStyles: { fillColor: [139,0,0] },
          margin: { bottom: 10 },
          styles: { cellPadding: 6, fontSize: 12 },
        });
  
        // Net Profit Section
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 20,
          head: [["Net Profit"]],
          body: [[`Net Profit: Rs ${report.netProfit || 0}`]], 
          theme: "striped",
          headStyles: { fillColor: [139,0,0] },
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

    
    const monthName = months[report.month - 1] || "Unknown Month"; 

        const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
        report.sellerNo === 1010 ? "Shoes" :
        report.sellerNo === 1011 ? "Accessories" :
        report.sellerNo === 1000 ? "Saloon" :
        "Unknown Shop"; 

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
            className="fixed bottom-6 right-6 bg-primary text-white p-4 mr-20 rounded-full shadow-lg hover:bg-blue-700"
          >
            <FaDownload size={20} />
          </button>
        </div>
      </div>
    );
  };

const getShopIDFromName = (shopName) => {
  const lowerCaseShopName = shopName.toLowerCase();
  if (lowerCaseShopName === "clothing") return 1101;
  if (lowerCaseShopName === "shoes") return 1010;
  if (lowerCaseShopName === "accessories") return 5000;
  if (lowerCaseShopName === "saloon") return 1000;
  return "";
};

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
          const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

          const shopID = getShopIDFromName(normalizedSearchTerm);

          const sellerno = shopID !== "" ? shopID : normalizedSearchTerm;

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
