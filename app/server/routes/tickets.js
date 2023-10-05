/***************************************************
 * File: routes/ticket.js
 *
 * This file holds routes regarding the ticket controllers
 */

import express from "express";
import {
  getTickets,
  createTicket,
  // retrieveTicketStatus,
  retrieveTicketObj,
  updateTicketStatus,
  updateTicket,
  updateTicketDiscId,
} from "../controllers/tickets.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", createTicket);
// router.get("/:id/:email", retrieveTicketStatus);
router.get("/:id/:email", retrieveTicketObj);
router.put("/:id/:status", updateTicketStatus);
router.put("/updateDiscId/:id/:discId", updateTicketDiscId);
router.put("/:ticketId", updateTicket);
export default router;
