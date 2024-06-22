import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
  dislikeComment,
  replyToComment,
  editComment,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.put("/:id", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
router.put("/like/:commentId", verifyToken, likeComment);
router.put("/dislike/:commentId", verifyToken, dislikeComment);
router.post("/reply", verifyToken, replyToComment);

export default router;
