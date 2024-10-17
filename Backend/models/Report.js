const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the report schema
const reportSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  sellerNo: { type: Number, required: true }, // Change shopID to sellerNo for consistency
  month: { type: String, required: true },
  year: { type: String, required: true },
  
  totalIncome: { type: Number, required: true },
  totalExpenses: { type: Number, required: true },
  totalPettyCash: { type: Number, required: true },
  
  netProfit: { type: Number, required: true }, // Calculated as totalIncome - (totalExpenses + totalPettyCash)
  
  expenses: {
    purchasingCost: { type: Number, default: 0 }, // Optional fields get default values
    storeMaintenance: { type: Number, default: 0 },
    electricityBill: { type: Number, required: true },
    internetBill: { type: Number, required: true },
    waterBill: { type: Number, required: true },
    employeeSalaries: { type: Number, required: true },
    marketingCost: { type: Number, default: 0 },
  },
  
  pettyCash: {
    minorRepairs: { type: Number, default: 0 },
    transportationCost: { type: Number, required: true },
    bankFees: { type: Number, required: true },
    courierFees: { type: Number, required: true },
    officeSupplies: { type: Number, default: 0 },
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;