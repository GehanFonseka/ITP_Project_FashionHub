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

  const shopOptions = [
    { id: "SHID01", name: "Clothing" },
    { id: "SHID02", name: "Shoes" },
    { id: "SHID03", name: "Accessories" },
    { id: "SHID04", name: "Saloon" },
  ];

  const shopMap = {
    SHID01: "Clothing",
    SHID02: "Shoe",
    SHID03: "Accessories",
    SHID04: "Saloon",
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
        (report) => report.shopID === selectedReportsShop
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
    const numericalMonth = month ? parseInt(month, 10) : null;
    const calculateRoute =
      salesView === "daily"
        ? "calculate-daily-sales"
        : "calculate-monthly-sales";

    const fetchRoute = salesView === "daily" ? "daily-sales" : "monthly-sales";

    const payload =
      salesView === "daily"
        ? { shopId: selectedSalesShop, year, month: numericalMonth, day }
        : { shopId: selectedSalesShop, year, month: numericalMonth };

    setLoading(true);
    setError(null);

    try {
      // Step 1: POST request to calculate sales data
      await axios.post(
        `http://localhost:5000/api/income/${calculateRoute}`,
        payload
      );

      // Step 2: GET request to fetch the calculated sales data
      const response = await axios.get(
        `http://localhost:5000/api/income/${fetchRoute}`,
        { params: payload }
      );

      if (response.data && response.data.salesDetails) {
        setSalesData(response.data.salesDetails);
      } else {
        setSalesData([]);
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
      setError("Failed to fetch sales data. Please try again later.");
      setSalesData([]);
    } finally {
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

  // PDF generation function
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    // Set title for the document
    doc.text(`Shop ${selectedShopName} Reports`, 40, 40);

    // Loop over each year of reports and generate a separate table
    Object.keys(reportsByYear).forEach((year, index) => {
      const yearReports = reportsByYear[year].map((report) => [
        monthNames[report.month - 1],
        report.totalIncome.toFixed(2),
        report.totalExpenses.toFixed(2),
        report.netProfit.toFixed(2),
      ]);

      // Add a new page for each year except the first
      if (index !== 0) {
        doc.addPage();
      }

      const yearLabelYPosition = 80;

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
      });
    });

    // Save the PDF
    doc.save(`Shop-${selectedShopName}-Reports.pdf`);
  };

  const reportsByYear = groupReportsByYear(filteredReports);

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
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
            backgroundColor: "#2b6cb0", // Blue
          },
          {
            label: "Total Expenses (Rs.)",
            data: expensesData,
            backgroundColor: "#e76f51", // Red
          },
          {
            label: "Net Profit (Rs.)",
            data: netProfitData,
            backgroundColor: "#2f855a", // Green
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
            disabled={!year} // Disable month selection until the year is selected
          >
            <option value="">Select Month</option>
            {monthNames.map((m, index) => {
              const monthNumber = index + 1;
              const isDisabled =
                year === currentYear.toString() && monthNumber > currentMonth; // Disable future months if the current year is selected
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
              disabled={!month} // Disable day selection until the month is selected
            >
              <option value="">Select Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const isDisabled =
                  year === currentYear.toString() &&
                  month === currentMonth.toString() &&
                  d > currentDay; // Disable future days if current year and month are selected
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
          className="p-2 bg-[#5C646C] text-white rounded mb-4"
        >
          Show Sales
        </button>
        {loading && <p>Loading sales data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {salesData.length > 0 && (
          <>
            <table className="table w-full mb-4" id="report-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Quantity Sold</th>
                  <th>Total Sales (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
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
          onChange={(e) => setSelectedReportsShop(e.target.value)}
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
          <table className="table w-full mb-4" id="report-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Income (Rs.)</th>
                <th>Total Expenses (Rs.)</th>
                <th>Net Profit (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {reportsByYear[year].map((report) => (
                <tr key={report._id}>
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
            className="p-2 bg-[#5C646C] text-white rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Overview;
