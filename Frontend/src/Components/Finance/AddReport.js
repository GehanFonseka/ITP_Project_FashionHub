import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddReport = () => {
  const [sellerNo, setSellerNo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const currentMonth = new Date().getMonth(); 
  const currentYear = new Date().getFullYear(); 

  const handleGenerate = () => {
    if (sellerNo && month && year) {
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
  
      // Convert the selected month name to its numeric value (1-12)
      const numericMonth = monthNames.indexOf(month) + 1;
  
      // Convert sellerNo and year into numbers
      const numericSellerNo = Number(sellerNo); // or use: const numericSellerNo = +sellerNo;
      const numericYear = Number(year); // or use: const numericYear = +year;
  
      navigate("/balanceSheet", {
        state: { sellerNo: numericSellerNo, month: numericMonth, year: numericYear },
      });
    } else {
      alert("Please select all fields");
    }
  };
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-light font-saira">
      <h1 className="text-3xl font-russo text-dark mt-8">
        Financial Management
      </h1>
      <div className="mt-8 bg-primary rounded-t-lg w-full max-w-md">
        <h2 className="text-white text-center py-2 font-semibold">
          Add A Report
        </h2>
      </div>
      <div className="bg-light border border-primary w-full max-w-md p-6 rounded-b-lg shadow-lg">
        <div className="bg-gray-200 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-dark font-semibold mb-2">
              Select Seller:
            </label>
            <select
              className="select w-full bg-gray-100 p-2 border  rounded text-[#5C646C]"
              value={sellerNo}
              onChange={(e) => setSellerNo(e.target.value)}
            >
              <option value="" disabled selected>
                Choose a shop
              </option>
              <option value={1101}>Clothing</option>
              <option value={1010}>Shoes</option>
              <option value={1011}>Accessories</option>
              <option value={1000}>Saloon</option>
            </select>
          </div>

          <div>
            <label className="block text-dark font-semibold mb-2">
              Select the Year:
            </label>
            <select
              className="select w-full bg-gray-100 p-2 border  rounded text-[#5C646C]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled selected>
                Choose a year
              </option>
              {[2021, 2022, 2023, 2024].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-dark font-semibold mb-2">
              Select the Month:
            </label>
            <select
              className="select w-full bg-gray-100 p-2 border  rounded text-[#5C646C]"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              disabled={!year || parseInt(year) > currentYear} 
            >
              <option value="" disabled selected>
                Choose a month
              </option>
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
              ].map((m, index) => (
                <option key={m} value={m} disabled={index > currentMonth && year == currentYear}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button className="btn bg-red-400 text-white hover:bg-red-500">
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="btn bg-[#4CAF50] text-white hover:bg-green-500"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReport;
