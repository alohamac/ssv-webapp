/*
 * File: controllers/comment.js
 * Here contains all CRUD ops for a Comment
 * Current Operations:
 * - Create
 * - Get (Set) of Comments based on array of comId's
 */

import Comment from "../models/comment.js";

/* CREATE a new Comment
 * Syntax: http://localhost:5000/comment
 */
export const createComment = async (req, res) => {
  // console.log("In comment with body: " + JSON.stringify(req.body));

  const newComment = new Comment(req.body);
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message });
  }
};

/* Get all comments associated with a discussion board
 * Should return all comments as an array of JSON objs
 * Syntax: http://localhost:5000/comment
 * Must use params in GET request:
 * params: {discCommentList: array}
 */

// ATTEMPT 2
export const getCommentSet = async (req, res) => {
  try {
    const commentListString = req.query.discCommentList;

    const thisComment = await Comment.find({
      comId: { $in: commentListString },
      // comId: { $in: JSON.stringify(testObj) },
    }).sort({ _id: 1 });

    if (!thisComment) {
      return res.status(409).send("No Comments associated with these ids");
    } else return res.status(200).json(thisComment);
  } catch (err) {
    return res
      .status(409)
      .send("Unexpected error occurred while looking for Comments. " + err);
  }
};
