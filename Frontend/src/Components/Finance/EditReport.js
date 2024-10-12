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
      navigate("/reportView"); 
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  if (!report) return <div>Loading...</div>;

  const requiredFields = ["electricityBill","internetBill","waterBill","employeeSalaries"];
  const requiredCashFields = ["transportationCost", "bankFees","courierFees",];


  // Determine the shop name
  const sellerNo = report.sellerNo === 1101 ? "Clothing" : 
  report.sellerNo === 1010 ? "Shoes" :
  report.sellerNo === 1011 ? "Accessories" :
  report.sellerNo === 1000 ? "Saloon" :
  "Unknown Shop"; 

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
                  value={sellerNo}
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

          {/* Expenses Section */}
          <div className="mb-o bg-[#D9D9D9] p-4  rounded-md shadow-inner border-2 border-[#C0C0C0]">
            <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
              Balance Sheet
            </h3>
            <div className="grid grid-cols-2 gap-6">
              
              {/* Expenses (Assets) */}
              <div className="bg-[#D9D9D9] p-4 rounded-md border-2 border-[#C0C0C0]">
                <h5 className="text-md font-semibold mb-2 text-[#5C646C] font-russo">
                  Assets
                </h5>
                {["purchasingCost", "storeMaintenance"].map((expense, index) => (
                  <div className="flex justify-between items-center mb-2" key={index}>
                    <span className="text-[#5C646C]">
                      {expense.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <input
                      type="number"
                      name={`expenses.${expense}`}
                      value={report.expenses[expense]}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        const { value } = e.target;
                            // Prevent the user from typing "0" as the first character
                            if (e.key === "0" && value === "") {
                              e.preventDefault();
                            }
                        if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "." || e.key === "E" ) {
                          e.preventDefault();
                        }
                      }}
                      className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                      min="1"
                    />
                  </div>
                ))}
              </div>
              
              {/* Expenses (Liabilities) */}
              <div className="bg-[#D9D9D9] p-4 rounded-md border-2 border-[#C0C0C0]">
                <h5 className="text-md font-semibold mb-2 text-[#5C646C] font-russo">
                  Liabilities
                </h5>
                {["electricityBill", "internetBill","waterBill","employeeSalaries","marketingCost"].map((expense, index) => (
                  <div className="flex justify-between items-center mb-2" key={index}>
                    <span className="text-[#5C646C]">
                      {expense.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <input
                      type="number"
                      name={`expenses.${expense}`}
                      value={report.expenses[expense]}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        const { value } = e.target;
                            // Prevent the user from typing "0" as the first character
                            if (e.key === "0" && value === "") {
                              e.preventDefault();
                            }
                        if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "." || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      className="border border-[#E76F51] p-1 rounded w-24 text-dark bg-[#F4F4F4]"
                      min="1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Petty Cash Section */}
          <div className="mt-0 mb-0 bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0] mt-4">
            <h3 className="text-lg font-semibold mb-2 text-[#5C646C] border-b-2 border-[#C0C0C0] font-russo text-left">
              Petty Cash
            </h3>
            <div className="bg-[#D9D9D9] p-4 rounded-md border-2 border-[#C0C0C0]">
              {["minorRepairs", "transportationCost", "bankFees", "courierFees", "officeSupplies"].map((cash, index) => (
                <div className="flex flex-col mb-4" key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#5C646C]">
                      {cash.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <input
                      type="number"
                      name={`pettyCash.${cash}`}
                      value={report.pettyCash[cash] || ""}
                      onChange={(e) => handleChange(e)}
                      onKeyDown={(e) => {
                        const { value } = e.target;
                            // Prevent the user from typing "0" as the first character
                            if (e.key === "0" && value === "") {
                              e.preventDefault();
                            }
                        if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "." || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      className={`border p-1 rounded w-24 text-dark bg-[#F4F4F4] ${
                        report.pettyCash[`${cash}Error`] ? "border-red-500" : "border-[#E76F51]"
                      }`}
                      min="1"
                    />
                  </div>
                  {report.pettyCash[`${cash}Error`] && (
                    <span className="text-red-500 text-sm">
                      {report.pettyCash[`${cash}Error`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Net Profit Display */}
          <div className="mt-0 mb-0 bg-[#D9D9D9] p-4 rounded-md shadow-inner border-2 border-[#C0C0C0] mt-4">
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
