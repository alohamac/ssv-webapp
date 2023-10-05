/***************************************************
 * File: models/discussionBoard.js
 *
 * This file holds the Schema used to represent
 * a "Discussion Board".
 *
 * Required attributes:
 *
 * Non required attributes:
 *  - A unique ID beginning in 'D-'
 *  - A list of Admin Obj Ids associated with the discBoard
 *  - A list of Client Obj Ids associated with the discBoard
 *  - A list of Comment Obj IDs
 */

import mongoose from "mongoose";

const discussionBoardSchema = mongoose.Schema({
  discId: {
    type: String,
    index: { unique: true },
    default: () => "D-" + Math.random().toString().slice(2, 12),
    immutable: true,
  },
  discAdminList: [String],
  discClientList: [String],
  discCommentList: [String],
});

const DiscussionBoard = mongoose.model(
  "DiscussionBoard",
  discussionBoardSchema
);
export default DiscussionBoard;
