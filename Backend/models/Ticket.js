const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
  issueType: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: false, // Optional
  },
  attachments: {
    type: String, 
    required: false, 
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Resolved", "Rejected"],
    default: "Pending", 
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  response: {
    type: String, // Optional response field
    required: false,
  },
});

// Update the `updatedDate` before saving any updates
ticketSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
