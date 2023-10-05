import express from "express";
import { createComment, getCommentSet } from "../controllers/comment.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getCommentSet);

export default router;
