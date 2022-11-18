import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* GET */
// In a production app, instead of retrieving all the posts,
// here should've been a fancy sorting algorithm to adjust
// to users preferences
router.get("/", verifyToken, getFeedPosts);
// Get users posts
router.get("/:userId/posts", verifyToken, getUserPosts);

/* PATCH */
router.patch("/:id/like", verifyToken, likePost);

export default router;
