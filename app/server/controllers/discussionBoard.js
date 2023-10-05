/************************************************************
 * File: controllers/discussionBoard.js
 *
 * This file will contain the controllers responsible for
 * performing CRUD operations related to the discussion
 * board (discBoard)
 *
 * Current CRUD ops:
 *  - Create a new Discussion Board
 *  - Get a Discussion Board
 *  - Update a Discussion Board
 */

import DiscussionBoard from "../models/discussionBoard.js";

/* CREATE a new Discussion Board
/* http://localhost:5000/discussionBoard */
export const createDiscussionBoard = async (req, res) => {
  const newDiscBoard = new DiscussionBoard(req.body);
  try {
    await newDiscBoard.save();
    res.status(201).json(newDiscBoard);
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message });
  }
};

/* GET the discussion board associated with a support ticket.
 * Should return (1) Discussion Board
 * Syntax:
 * http://localhost:5000/discussionBoard/<discId>
 */
export const getDiscussionBoard = async (req, res) => {
  try {
    const thisBoard = await DiscussionBoard.findOne({
      discId: req.params.discId,
    });
    if (!thisBoard) {
      return res
        .status(409)
        .send(
          "No Board associated with id " +
            req.params.discId +
            " was found in database."
        );
    } else {
      return res.status(201).json(thisBoard);
    }
  } catch (err) {
    return res
      .status(409)
      .send(
        "Unexpected error occurred while looking for DiscussionBoard with id " +
          req.params.discId +
          " in database " +
          err
      );
  }
};

// Syntax: http://localhost:5000/discussionBoard/<discId>
export const updateDiscussionBoard = async (req, res) => {
  const discussionBoard = req.params;

  try {
    const status = await DiscussionBoard.updateOne(
      { discId: discussionBoard.discId },
      { $set: req.body }
    );

    if (status.modifiedCount != 1) {
      //Discussion Board could not be found
      console.log("status: " + JSON.stringify(status));
      res
        .status(409)
        .send(
          "Discussion Board could not be updated. Either no Board exists with id: " +
            req.params.discId +
            " , or no value was changed."
        );
    } else {
      res
        .status(201)
        .send("Board " + req.params.discId + " successfully updated.");
    }
  } catch (err) {
    res
      .status(409)
      .send("Unexpected error occurred when updating Board: " + err);
  }
};
