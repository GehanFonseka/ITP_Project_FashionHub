const express = require("express");
const router = express.Router();
const Income = require("../models/income");
const Checkout = require("../models/checkout.model"); // Use Checkout schema

// Helper function to calculate income based on a date range
const calculateIncome = async (sellerNo, startDate, endDate) => {
  const result = await Checkout.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }, // Match on createdAt
        "items.sellerNo": sellerNo, // Filter by sellerNo
      },
    },
    { $unwind: "$items" }, // Deconstruct items array
    {
      $match: {
        "items.sellerNo": sellerNo, // Filter by sellerNo within items
      },
    },
    {
      $group: {
        _id: "$items.ItemsN", // Group by item name (ItemsN)
        totalSales: {
          $sum: {
            $multiply: ["$items.quantity", "$items.price"], // Calculate total sales
          },
        },
        totalQuantity: {
          $sum: "$items.quantity", // Sum total quantities
        },
      },
    },
  ]);

  return result;
};

// Function to calculate and store income for a specific seller
const calculateAndStoreIncome = async (sellerNo, year, month) => {
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  // Calculate total income
  const result = await Checkout.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        "items.sellerNo": sellerNo,
      },
    },
    { $unwind: "$items" },
    {
      $match: {
        "items.sellerNo": sellerNo,
      },
    },
    {
      $group: {
        _id: "$items.sellerNo", // Group by sellerNo
        totalIncome: {
          $sum: {
            $multiply: ["$items.quantity", "$items.price"],
          },
        },
      },
    },
  ]);

  const totalIncome = result.length > 0 ? result[0].totalIncome : 0;

  // Upsert income record
  await Income.findOneAndUpdate(
    { sellerNo, year, month },
    { totalIncome },
    { upsert: true, new: true }
  );
};

// POST route to calculate income
router.post("/calculate-income", async (req, res) => {
  try {
    const { sellerNo, year, month } = req.body;
    if (!sellerNo || !year || !month) {
      return res.status(400).json({
        message: "Missing required parameters: sellerNo, year, and month.",
      });
    }

    await calculateAndStoreIncome(sellerNo, year, month);
    res
      .status(200)
      .json({ message: "Income calculated and stored successfully." });
  } catch (error) {
    console.error("Error calculating income:", error.message);
    res
      .status(500)
      .json({ message: "Failed to calculate income", error: error.message });
  }
});

// GET route to retrieve income for a seller by year and month
router.get("/income", async (req, res) => {
  try {
    const { sellerNo, year, month } = req.query;

    if (!sellerNo || !year || !month) {
      return res.status(400).json({
        message: "Missing required query parameters: sellerNo, year, and month.",
      });
    }

    const income = await Income.findOne({ sellerNo, year, month });

    if (!income) {
      return res.status(404).json({
        message: "Income not found for the given seller, year, and month.",
      });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error("Error fetching income:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch income", error: error.message });
  }
});

// GET route to retrieve all incomes
router.get("/all-incomes", async (req, res) => {
  try {
    const incomes = await Income.find();

    if (!incomes.length) {
      return res.status(404).json({ message: "No income records found." });
    }

    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch incomes", error: error.message });
  }
});

// POST route to calculate daily sales for a seller
router.post("/calculate-daily-sales", async (req, res) => {
  try {
    const { sellerNo, year, month, day } = req.body;

    const startDate = new Date(`${year}-${month}-${day}`);
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999); // End of day

    const sales = await calculateIncome(sellerNo, startDate, endDate);
    const totalIncome = sales.reduce((sum, item) => sum + item.totalSales, 0);

    await Income.findOneAndUpdate(
      { sellerNo, year, month, day },
      {
        totalIncome,
        salesDetails: sales.map((item) => ({
          itemsN: item._id, // Use ItemsN for item name
          quantity: item.totalQuantity,
          totalSales: item.totalSales,
        })),
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Daily sales calculated successfully", totalIncome });
  } catch (error) {
    console.error("Error calculating daily sales:", error.message);
    res.status(500).json({
      message: "Failed to calculate daily sales",
      error: error.message,
    });
  }
});


// POST route to calculate monthly sales for a seller
router.post("/calculate-monthly-sales", async (req, res) => {
  try {
    const { sellerNo, year, month } = req.body;

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of the next month
    endDate.setDate(0); // Last day of the month

    // Assuming calculateIncome function is modified to handle monthly calculations
    const sales = await calculateIncome(sellerNo, startDate, endDate);
    const totalIncome = sales.reduce((sum, item) => sum + item.totalSales, 0);

    await Income.findOneAndUpdate(
      { sellerNo, year, month },
      {
        totalIncome,
        salesDetails: sales.map((item) => ({
          itemsN: item._id, // Use ItemsN for item name
          quantity: item.totalQuantity,
          totalSales: item.totalSales,
        })),
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Monthly sales calculated successfully", totalIncome });
  } catch (error) {
    console.error("Error calculating monthly sales:", error.message);
    res.status(500).json({
      message: "Failed to calculate monthly sales",
      error: error.message,
    });
  }
});




// GET route to fetch daily sales
router.get("/daily-sales", async (req, res) => {
  try {
    const { sellerNo, year, month, day } = req.query;

    const income = await Income.findOne({ sellerNo, year, month, day });

    if (!income) {
      return res
        .status(404)
        .json({ message: "Daily sales not found for the given date." });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error("Error fetching daily sales:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch daily sales", error: error.message });
  }
});

// GET route to fetch monthly sales
router.get("/monthly-sales", async (req, res) => {
  try {
    const { sellerNo, year, month } = req.query;

    const income = await Income.findOne({ sellerNo, year, month });

    if (!income) {
      return res
        .status(404)
        .json({ message: "Monthly sales not found for the given month." });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error("Error fetching monthly sales:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch monthly sales", error: error.message });
  }
});

module.exports = router;
