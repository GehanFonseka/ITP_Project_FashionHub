const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Create a new report
router.post("/", async (req, res) => {
  try {
    const {
      sellerNo, // Change from shopID to sellerNo
      month,
      year,
      totalIncome,
      totalExpenses,
      totalPettyCash,
      netProfit,
      expenses,
      pettyCash,
    } = req.body;

    const report = new Report({
      sellerNo, // Use sellerNo instead of shopID
      month,
      year,
      totalIncome,
      totalExpenses,
      totalPettyCash,
      netProfit,
      expenses,
      pettyCash,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    console.error("Failed to create report:", error.message);
    res.status(400).json({ message: "Failed to create report", error: error.message });
  }
});

// Update a report by ID
router.put("/:id", async (req, res) => {
  try {
    const {
      totalIncome,
      totalExpenses,
      totalPettyCash,
      netProfit,
      expenses,
      pettyCash,
    } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      {
        totalIncome,
        totalExpenses,
        totalPettyCash,
        netProfit,
        expenses,
        pettyCash,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report updated successfully",
      report: updatedReport,
    });
  } catch (error) {
    console.error("Failed to update report:", error.message);
    res.status(400).json({ message: "Failed to update report", error: error.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Failed to fetch reports:", error.message);
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
});

// Get a report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("Failed to fetch report:", error.message);
    res.status(500).json({ message: "Failed to fetch report", error: error.message });
  }
});

// Delete a report by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({
      message: "Report deleted successfully",
      report: deletedReport,
    });
  } catch (error) {
    console.error("Failed to delete report:", error.message);
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
});

module.exports = router;
