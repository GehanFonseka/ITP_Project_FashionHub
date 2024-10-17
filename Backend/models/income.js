const mongoose = require("mongoose");

// Define the Income schema
const incomeSchema = new mongoose.Schema({
  sellerNo: {  // Changed from shopId to sellerNo
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    // Field to handle daily sales calculations
    type: Number,
    required: false, // Optional for monthly records
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  salesDetails: [
    {
      itemsN: String,  // Changed from itemId to ItemsN
      quantity: Number, // Quantity of each item sold
      totalSales: Number, // Total sales for the item (quantity * price)
    },
  ],
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
