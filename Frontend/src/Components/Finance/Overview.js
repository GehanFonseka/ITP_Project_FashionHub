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
    const shopNumber = Number(e.target.value); 
    setSelectedSalesShop(shopNumber);          
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
  const numericalMonth = month ? parseInt(month, 10) : null;

  const numericalSellerNo = parseInt(selectedSalesShop, 10); 
  const numericalYear = parseInt(year, 10);                  
  const numericalDay = parseInt(day, 10);                   


  const calculateRoute =
    salesView === "daily"
      ? "calculate-daily-sales"
      : "calculate-monthly-sales";

  const fetchRoute = salesView === "daily" ? "daily-sales" : "monthly-sales";

  const payload =
    salesView === "daily"
      ? { sellerNo: numericalSellerNo, year: numericalYear, month: numericalMonth, day: numericalDay}
      : { sellerNo: numericalSellerNo, year: numericalYear, month: numericalMonth };

  console.log("Selected Seller No:", selectedSalesShop);
  console.log("Payload for POST request:", payload);

  setLoading(true);
  setError(null);

  try {
    console.log(`Sending POST request to http://localhost:5000/api/income/${calculateRoute}`);
    await axios.post(`http://localhost:5000/api/income/${calculateRoute}`, payload);

    console.log(`Sending GET request to http://localhost:5000/api/income/${fetchRoute}`);
    const response = await axios.get(`http://localhost:5000/api/income/${fetchRoute}`, {
      params: payload
    });

    console.log("API Response:", response);

    if (response.data && response.data.salesDetails) {
      setSalesData(response.data.salesDetails);
    } else {
      setSalesData([]);
    }
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

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

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
  
    doc.setTextColor("#E76F51");
  
    doc.setFontSize(24);

    const logo = 'data:image/png;base64,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'; // Add your logo's Base64 string here
        const imgWidth = 150;  
        const imgHeight = 50;  
        const pageWidth = doc.internal.pageSize.width;
        const centerX = (pageWidth - imgWidth) / 2;  

        
      doc.addImage(logo, 'PNG', centerX, 20, imgWidth, imgHeight);
         
      doc.setTextColor("#000000");

    const today = new Date();
    const formattedDate = `Released Date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
    doc.setFontSize(12);
    doc.setTextColor(92, 100, 108);
    doc.text(formattedDate, 20, 20); 
  
    doc.setFontSize(12);
    doc.setTextColor(139,0,0);
    doc.text(`Shop ${selectedShopName} Reports`, 40, 100);
  
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

      doc.setFontSize(12);
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
          fillColor: "#8B0000", 
          textColor: "#ffffff", 
        },
      });
    });
  
    doc.save(`Shop-${selectedShopName}-Reports.pdf`);
  };
  
  

  const reportsByYear = groupReportsByYear(filteredReports);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

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
          onChange={(e) => setSelectedReportsShop(Number(e.target.value))} 
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
