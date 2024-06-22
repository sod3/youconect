// controllers/comment.js
import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// Add a comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Edit a comment
export const editComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { desc: req.body.desc } },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};

// Delete a comment

// Add a reply to a comment
export const replyToComment = async (req, res, next) => {
  const { commentId, userId, desc } = req.body;
  try {
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const reply = new Comment({
      userId,
      desc,
      videoId: parentComment.videoId, // Set videoId from parent comment
      replyTo: commentId, // Reference to the parent comment
    });

    const savedReply = await reply.save();

    // Optionally, you can update the parent comment to include the reply
    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: savedReply._id },
    });

    res.status(200).json(savedReply);
  } catch (err) {
    next(err);
  }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.videoId);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get comments for a video, optionally sorted
export const getComments = async (req, res, next) => {
  try {
    const { sort } = req.query;
    let comments;
    if (sort === "likes") {
      comments = await Comment.find({ videoId: req.params.videoId }).sort({ likes: -1 });
    } else {
      comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    }
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// Like a comment
export const likeComment = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The comment has been liked.");
  } catch (err) {
    next(err);
  }
};

// Dislike a comment
export const dislikeComment = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The comment has been disliked.");
  } catch (err) {
    next(err);
  }
};
