import React, { useState, useEffect } from "react";
import axios from "axios";
import "daisyui";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const Overview = () => {
  const [reports, setReports] = useState([]);
  const [selectedSalesShop, setSelectedSalesShop] = useState("");
  const [selectedReportsShop, setSelectedReportsShop] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [salesView, setSalesView] = useState("daily");
  const [salesData, setSalesData] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleShopChange = (e) => {
    const shopNumber = Number(e.target.value); // Convert the input value to a number
    setSelectedSalesShop(shopNumber);          // Update the state with the number
  };
  

  const shopOptions = [
    { id: 1101, name: "Clothing" },
    { id: 1010, name: "Shoes" },
    { id: 1011, name: "Accessories" },
    { id: 1004, name: "Saloon" },
  ];
  

  const shopMap = {
    1101: "Clothing",
    1010: "Shoes",
    1011: "Accessories",
    1004: "Saloon",
  };
  
  // Get the shop name from the shopMap
  const selectedShopName = shopMap[selectedReportsShop] || selectedReportsShop;

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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (selectedReportsShop) {
      const filtered = reports.filter(
        (report) => report.sellerNo === selectedReportsShop
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports([]);
    }
  }, [selectedReportsShop, reports]);

  const handleToggle = () => {
    setSalesView(salesView === "daily" ? "monthly" : "daily");
  };

const fetchSalesData = async () => {
  // Convert the month to a number if it exists
  const numericalMonth = month ? parseInt(month, 10) : null;

  // Convert sellerNo, year, and day to numbers
  const numericalSellerNo = parseInt(selectedSalesShop, 10); // Convert sellerNo
  const numericalYear = parseInt(year, 10);                  // Convert year
  const numericalDay = parseInt(day, 10);                    // Convert day


  // Determine the correct API route for calculating sales data
  const calculateRoute =
    salesView === "daily"
      ? "calculate-daily-sales"
      : "calculate-monthly-sales";

  // Determine the correct API route for fetching sales data
  const fetchRoute = salesView === "daily" ? "daily-sales" : "monthly-sales";

  // Prepare the payload for the POST request
  const payload =
    salesView === "daily"
      ? { sellerNo: numericalSellerNo, year: numericalYear, month: numericalMonth, day: numericalDay}
      : { sellerNo: numericalSellerNo, year: numericalYear, month: numericalMonth };

  // Log payload and selectedSalesShop for debugging
  console.log("Selected Seller No:", selectedSalesShop);
  console.log("Payload for POST request:", payload);

  // Set loading to true and reset error state
  setLoading(true);
  setError(null);

  try {
    // Step 1: POST request to calculate sales data
    console.log(`Sending POST request to http://localhost:5000/api/income/${calculateRoute}`);
    await axios.post(`http://localhost:5000/api/income/${calculateRoute}`, payload);

    // Step 2: GET request to fetch the calculated sales data
    console.log(`Sending GET request to http://localhost:5000/api/income/${fetchRoute}`);
    const response = await axios.get(`http://localhost:5000/api/income/${fetchRoute}`, {
      params: payload
    });

    // Log the full response for debugging
    console.log("API Response:", response);

    // Check if response contains the salesDetails data
    if (response.data && response.data.salesDetails) {
      setSalesData(response.data.salesDetails);
    } else {
      // If no sales data found, set an empty array
      setSalesData([]);
    }
  } catch (error) {
    // Enhanced error logging for better debugging
    if (error.response) {
      // Server responded with a status code outside 2xx range
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
    } else {
      // Other errors (e.g., setting up the request)
      console.error("Error message:", error.message);
    }

    // Set error state to notify user
    setError("Failed to fetch sales data. Please try again later.");
    setSalesData([]);
  } finally {
    // Reset loading state
    setLoading(false);
  }
};


  const groupReportsByYear = (reports) => {
    return reports.reduce((acc, report) => {
      if (!acc[report.year]) acc[report.year] = [];
      acc[report.year].push(report);
      return acc;
    }, {});
  };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
  
    // Set the color for the title
    doc.setTextColor("#E76F51");
  
    doc.setFontSize(24);
  
    const title = "FashionHub";
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const titleXPosition = (pageWidth - titleWidth) / 2;
    doc.text(title, titleXPosition, 40);
  
    // Set a normal color for the rest of the text
    doc.setTextColor("#000000");
  
    doc.setFontSize(16);
    doc.text(`Shop ${selectedShopName} Reports`, 40, 80);
  
    Object.keys(reportsByYear).forEach((year, index) => {
      const yearReports = reportsByYear[year].map((report) => [
        monthNames[report.month - 1],
        report.totalIncome.toFixed(2),
        report.totalExpenses.toFixed(2),
        report.netProfit.toFixed(2),
      ]);
  
      if (index !== 0) {
        doc.addPage();
      }
  
      const yearLabelYPosition = 120;
  
      // Add year label
      doc.text(`Year: ${year}`, 40, yearLabelYPosition);
  
      doc.autoTable({
        startY: yearLabelYPosition + 10,
        head: [
          [
            "Month",
            "Total Income (Rs.)",
            "Total Expenses (Rs.)",
            "Net Profit (Rs.)",
          ],
        ],
        body: yearReports,
        theme: "grid",
        styles: {
          halign: "center",
        },
        headStyles: {
          fillColor: "#E76F51", 
          textColor: "#ffffff", 
        },
      });
    });
  
    // Save the PDF
    doc.save(`Shop-${selectedShopName}-Reports.pdf`);
  };
  
  

  const reportsByYear = groupReportsByYear(filteredReports);

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Prepare data for the bar chart
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (filteredReports.length > 0) {
      const labels = filteredReports.map(
        (report) => monthNames[report.month - 1]
      );
      const incomeData = filteredReports.map((report) => report.totalIncome);
      const expensesData = filteredReports.map(
        (report) => report.totalExpenses + report.totalPettyCash
      );
      const netProfitData = filteredReports.map((report) => report.netProfit);

      //bar graph
      setChartData({
        labels,
        datasets: [
          {
            label: "Total Income (Rs.)",
            data: incomeData,
            backgroundColor: "#2b6cb0", 
          },
          {
            label: "Total Expenses (Rs.)",
            data: expensesData,
            backgroundColor: "#e76f51",
          },
          {
            label: "Net Profit (Rs.)",
            data: netProfitData,
            backgroundColor: "#4CAF50", 
          },
        ],
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Financial Overview for ${selectedShopName}`,
            font: {
              size: 20, 
            },
          },
        },
      });
    } else {
      setChartData(null);
    }
  }, [filteredReports, selectedShopName]);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F4F4F4] min-h-screen font-saira">
      <h1 className="text-4xl font-russo mb-6 text-[#5C646C]">
        Sales Overview
      </h1>

      {/* Sales Section */}
      <div className="mb-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#5C646C]">
            {salesView === "daily" ? "Daily Sales" : "Monthly Sales"}
          </h2>
          <button
            onClick={handleToggle}
            className="p-2 bg-[#E76F51] text-white rounded"
          >
            Toggle to {salesView === "daily" ? "Monthly" : "Daily"} Sales
          </button>
        </div>

        {/* Sales Filters */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Shop Selection */}
          <select
            className="select bg-gray-200 p-2 border border-[#E76F51] rounded text-[#5C646C]"
            value={selectedSalesShop}
            onChange={(e) => setSelectedSalesShop(e.target.value)}
          >
            <option value="">Choose Shop</option>
            {shopOptions.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>

          {/* Year Selection */}
          <select
            className="select bg-gray-200 p-2 border border-[#E76F51] rounded text-[#5C646C]"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {[2021, 2022, 2023, 2024].map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          {/* Month Selection */}
          <select
            className="select bg-gray-200 p-2 border border-[#E76F51] rounded text-[#5C646C]"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled={!year} 
          >
            <option value="">Select Month</option>
            {monthNames.map((m, index) => {
              const monthNumber = index + 1;
              const isDisabled =
                year === currentYear.toString() && monthNumber > currentMonth; 
              return (
                <option key={m} value={monthNumber} disabled={isDisabled}>
                  {m}
                </option>
              );
            })}
          </select>

          {/* Day Selection (for daily view) */}
          {salesView === "daily" && (
            <select
              className="select bg-gray-200 p-2 border border-[#E76F51] rounded text-[#5C646C]"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              disabled={!month} 
            >
              <option value="">Select Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const isDisabled =
                  year === currentYear.toString() &&
                  month === currentMonth.toString() &&
                  d > currentDay; 
                return (
                  <option key={d} value={d} disabled={isDisabled}>
                    {d}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        {/* Sales Table */}
        <button
          onClick={() => {
            fetchSalesData();
          }}
          className="p-2 bg-[#4CAF50] text-white rounded mb-4"
        >
          Show Sales
        </button>
        {loading && <p>Loading sales data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {salesData.length > 0 && (
          <>
            <table className="table w-full mb-4" id="report-table">
              <thead>
                <tr className="text-lg text-black">
                  <th>Item Name</th>
                  <th>Quantity Sold</th>
                  <th>Total Sales (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item) => (
                  <tr className="text-gray-800" key={item.itemsN}>
                    <td>{item.itemsN}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalSales.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-[#5C646C]">
                Income: Rs.{" "}
                {salesData
                  .reduce((acc, item) => acc + item.totalSales, 0)
                  .toFixed(2)}
              </h3>
            </div>
          </>
        )}
      </div>

      {/* Reports Overview Section */}
      <h1 className="text-4xl font-russo mb-6 text-[#5C646C]">
        Profit Overview
      </h1>
      <div className="mb-6 text-[#5C646C]">
        <label
          htmlFor="shop-dropdown"
          className="block text-lg font-semibold text-[#5C646C] border-[#E76F51] mb-2"
        >
          Select Shop:
        </label>
        <select
          id="shop-dropdown"
          className="bg-gray-200 p-2 border border-[#E76F51] rounded"
          value={selectedReportsShop}
          onChange={(e) => setSelectedReportsShop(Number(e.target.value))} // Convert value to a number
        >
          <option value="">Choose Shop</option>
          {shopOptions.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>

      </div>

      {/* Bar Chart */}
      {chartData && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Reports Table */}
      {Object.keys(reportsByYear).map((year) => (
        <div
          key={year}
          className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-[#5C646C] mb-4">
            Year: {year}
          </h3>
          <table className="table w-full mb-4 " id="report-table">
            <thead>
              <tr className="text-lg text-black">
                <th>Month</th>
                <th>Total Income (Rs.)</th>
                <th>Total Expenses (Rs.)</th>
                <th>Net Profit (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {reportsByYear[year].map((report) => (
                <tr className=" text-gray-800" key={report._id}>
                  <td>{monthNames[report.month - 1]}</td>
                  <td>{report.totalIncome.toFixed(2)}</td>
                  <td>
                    {(report.totalExpenses + report.totalPettyCash).toFixed(2)}
                  </td>
                  <td>{report.netProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* PDF Download */}
      {filteredReports.length > 0 && (
        <div className="mt-4">
          <button
            onClick={downloadPdf}
            className="p-2 bg-[#4CAF50] text-white rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Overview;
