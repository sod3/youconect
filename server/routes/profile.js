import express from "express";
import { getProfile } from "../controllers/profile.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get profile data
router.get("/:id", verifyToken, getProfile);

export default router;
