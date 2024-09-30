import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reports/${id}`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [id]);

  const calculateTotals = () => {
    if (!report) return;

    const totalExpenses = Object.values(report.expenses || {}).reduce(
      (acc, val) => acc + parseFloat(val || 0),
      0
    );
    const totalPettyCash = Object.values(report.pettyCash || {}).reduce(
      (acc, val) => acc + parseFloat(val || 0),
      0
    );

    const netProfit =
      parseFloat(report.totalIncome || 0) - totalExpenses - totalPettyCash;

    setReport((prev) => ({
      ...prev,
      totalExpenses,
      totalPettyCash,
      netProfit,
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");

    setReport((prev) => {
      if (section === "expenses") {
        return {
          ...prev,
          expenses: {
            ...prev.expenses,
            [key]: value,
          },
        };
      } else if (section === "pettyCash") {
        return {
          ...prev,
          pettyCash: {
            ...prev.pettyCash,
            [key]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/reports/${id}`, report);
      navigate("/reportView"); // Redirect back to the DisplayReport page
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  if (!report) return <div>Loading...</div>;


  const shopId = report.shopID === "SHID01" ? "Clothing" : 
        report.shopID === "SHID02" ? "Shoes" :
        report.shopID === "SHID03" ? "Accessories" :
        report.shopID === "SHID04" ? "Saloon" :
        "Unknown Shop"; // Default case if shopID doesn't match

  return (
    <div className="flex flex-col items-center p-8 bg-[#F4F4F4] min-h-screen font-saira">
      <h1 className="text-4xl font-russo mb-6 text-[#5C646C]">
        Edit Report for {report.month} {report.year}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl border-[5px] border-[#2E3192]">
        <h2 className="text-center text-white text-lg font-semibold mb-4 bg-[#E76F51] py-2 rounded-t-md font-russo">
          Report Details
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Non-editable Fields */}
          <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0]">
            <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
              Report Details
            </h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#5C646C]">Shop ID</span>
                <input
                  type="text"
                  value={shopId}
                  readOnly
                  className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#5C646C]">Month</span>
                <input
                  type="text"
                  value={report.month}
                  readOnly
                  className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#5C646C]">Year</span>
                <input
                  type="text"
                  value={report.year}
                  readOnly
                  className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#5C646C]">Total Income</span>
                <input
                  type="number"
                  value={report.totalIncome}
                  readOnly
                  className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                />
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0]">
            <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
              Expenses
            </h3>
            {/* Editable Expenses Section */}
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(report.expenses || {}).map((expense, index) => (
                <div
                  className="flex justify-between items-center mb-2"
                  key={index}
                >
                  <span className="text-[#5C646C]">
                    {expense.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="number"
                    name={`expenses.${expense}`}
                    value={report.expenses[expense]}
                    onChange={handleChange}
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0] mt-4">
            <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
              Petty Cash
            </h3>
            {/* Editable Petty Cash Section */}
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(report.pettyCash || {}).map((cash, index) => (
                <div
                  className="flex justify-between items-center mb-2"
                  key={index}
                >
                  <span className="text-[#5C646C]">
                    {cash.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="number"
                    name={`pettyCash.${cash}`}
                    value={report.pettyCash[cash]}
                    onChange={handleChange}
                    className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Net Profit Display */}
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
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#288b54] text-white p-2 rounded-md shadow-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
