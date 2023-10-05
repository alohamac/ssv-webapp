/***************************************************
 * File: models/supportTicket.js
 *
 * This file holds the Schema used to represent
 * a "support ticket".
 */
import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  ticketID: {
    type: String,
    index: { unique: true },
    default: () => Math.random().toString(36).slice(2).toUpperCase(),
    immutable: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  zipcode: { type: Number, required: true },
  requestDescription: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "Not Started" },
  discId: { type: String, default: "" },
});

const SupportTicket = mongoose.model("SupportTicket", ticketSchema);

export default SupportTicket;
