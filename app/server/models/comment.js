/*******************************************************
 * File: models/comment.js
 *
 * This file holds the Schema used to represent a "Comment"
 *
 * Current attributes:
 *  - Comment Id tag
 *  - A flag to depict an Admin comment
 *  - The name of the Commenter
 *  - The date of the Comment
 *  - The Time the comment was placed
 */

import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  comId: {
    type: String,
    index: { unique: true },
    default: () => "C-" + Math.random().toString().slice(2, 12),
    immutable: true,
  },
  comBody: String,
  comIsAdmin: Boolean,
  comName: String,
  comDate: String,
  comTime: String,
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
