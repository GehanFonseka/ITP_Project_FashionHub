const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phoneNumber,
      issueType,
      issueDescription,
      subject,
      shop,
      attachments,
      response, 
    } = req.body;

    const ticket = new Ticket({
      customerName,
      email,
      phoneNumber,
      issueType,
      issueDescription,
      subject,
      shop,
      attachments,
      response, 
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.error("Failed to create ticket:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create ticket", error: error.message });
  }
});

// Update a ticket by ID (e.g., changing status, response)
router.put("/:id", async (req, res) => {
  try {
    const { status, issueDescription, attachments, response } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        status,
        issueDescription,
        attachments,
        response, 
      },
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Failed to update ticket:", error.message);
    res
      .status(400)
      .json({ message: "Failed to update ticket", error: error.message });
  }
});

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Failed to fetch tickets:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch tickets", error: error.message });
  }
});

// Get a ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Failed to fetch ticket:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch ticket", error: error.message });
  }
});

// Delete a ticket by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({
      message: "Ticket deleted successfully",
      ticket: deletedTicket,
    });
  } catch (error) {
    console.error("Failed to delete ticket:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete ticket", error: error.message });
  }
});

module.exports = router;
