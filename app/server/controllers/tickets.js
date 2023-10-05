/************************************************************
 * File: controllers/tickets.js
 *
 * This file will contain the controllers responsible for
 * performing CRUD operations related to tickets
 *
 * Current CRUD ops:
 *  - Get all tickets
 *  - Creating a ticket 
 *  - Updating a ticket status
 *  - Updating a ticket discussion id.
 *  - Retrieve ticket.
 */

import { type } from "os";
import SupportTicket from "../models/supportTicket.js";

/*****************************************************************
 * Function: getTickets
 *
 * Function for getting all the tickets.
 * Returns: 
 *  if successful: all tickets
 *  else: error
 *****************************************************************/
export const getTickets = async (req, res) => {
  try {
    const ticket = await SupportTicket.find();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*****************************************************************
 * Function: getTickets
 *
 * Function for saving a ticket.
 * Returns: 
 *  if successful: saves the ticket into the database
 *  else: 409
 *****************************************************************/
export const createTicket = async (req, res) => {
  const ticket = req.body;

  const newTicket = new SupportTicket(ticket);
  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

/*****************************************************************
 * Function: updateTicketStatus
 *
 * Function for updating the ticket status.
 * Returns: 
 *  if successful: ticket status will change.
 *  else: 409
 *****************************************************************/
export const updateTicketStatus = async (req, res) => {
  const ticket = req.params;

  try {
    const status = await SupportTicket.updateOne(
      { ticketID: ticket.id },
      { status: ticket.status }
    );

    res.status(201).json("Success");
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

/*****************************************************************
 * Function: updateTicketDiscId
 *
 * Function for updating a discussion id. 
 * Returns: 
 *  if successful: updates the discussion id.
 *  else: 409
 *****************************************************************/
export const updateTicketDiscId = async (req, res) => {
  const ticket = req.params;

  try {
    const status = await SupportTicket.updateOne(
      { ticketID: ticket.id },
      { discId: ticket.discId }
    );

    res.status(201).json("Success");
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

/*****************************************************************
 * Function: getTickets
 *
 * Function for updating a ticket.
 * Returns: 
 *  if successful: updates ticket, 200
 *  else: 400
 *****************************************************************/
export const updateTicket = async (req, res) => {
  console.log("update Ticket with id: " + req.params.ticketId);

  try {
    const status = await SupportTicket.updateOne(
      {
        ticketID: req.params.ticketId,
      },
      { $set: req.body }
    );
    if (status.modifiedCount != 1) {
      // Ticket could not be found
      console.log("status: " + JSON.stringify(status));
      res
        .status(409)
        .send(
          "Ticket Status not updated. Either no ticket with id " +
            req.params.ticketId +
            " exists, or no changes were made."
        );
    } else {
      res
        .status(200)
        .send(
          "Ticket with ticketId " +
            req.params.ticketId +
            " successfully updated."
        );
    }
  } catch (err) {
    res
      .status(409)
      .send("Unexpected error occurred when updating ticket status: " + err);
  }
};

// export const retrieveTicketStatus = async (req, res) => {
//   const info = req.params;
//   try {
//     const ticket = await SupportTicket.find({
//       ticketID: info.id,
//       email: info.email,
//     });
//     const ticketStatusInfo = {
//       status: ticket[0].status,
//       requestDescription: ticket[0].requestDescription,
//       ticketID: ticket[0].ticketID,
//     };
//     if (!ticket.length) throw new Error("Invalid e-mail or request number.");
//     res.status(200).json(ticketStatusInfo);
//   } catch (error) {
//     error.message = "Invalid e-mail or request number.";
//     res.status(404).json({ message: error.message });
//   }
// };

/*****************************************************************
 * Function: retrieveTicketObj
 *
 * Function for retrieving a ticket object. 
 * Returns: 
 *  if successful: returns a ticket object.
 *  else: returns a ticket object 
 *****************************************************************/
export const retrieveTicketObj = async (req, res) => {
  const info = req.params;
  try {
    const ticket = await SupportTicket.find({
      ticketID: info.id,
      email: info.email,
    });
    // const ticketStatusInfo = {
    //   status: ticket[0].status,
    //   requestDescription: ticket[0].requestDescription,
    //   ticketID: ticket[0].ticketID,
    // };
    if (!ticket.length) throw new Error("Invalid e-mail or request number.");
    res.status(200).json(ticket[0]);
    // res.status(200).json(ticketStatusInfo);
  } catch (error) {
    error.message = "Invalid e-mail or request number.";
    res.status(404).json({ message: error.message });
  }
};
