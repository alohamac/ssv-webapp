import express from "express";
import {
  createDiscussionBoard,
  getDiscussionBoard,
  updateDiscussionBoard,
} from "../controllers/discussionBoard.js";

const router = express.Router();

router.post("/", createDiscussionBoard);
router.get("/:discId", getDiscussionBoard);
router.put("/:discId", updateDiscussionBoard);

export default router;
