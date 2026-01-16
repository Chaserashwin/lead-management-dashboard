const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
    index: true,
  },
  stage: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Negotiation", "Converted"],
    default: "New",
    index: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    enum: ["Website", "Email", "Phone", "Referral", "Event", "Social Media"],
    default: "Website",
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

leadSchema.index({
  firstName: "text",
  lastName: "text",
  email: "text",
  company: "text",
});

module.exports = mongoose.model("Lead", leadSchema);
