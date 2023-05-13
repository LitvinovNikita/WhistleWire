import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


/**READ */
router.get("/", verifyToken, getFeedPosts); // this will take users feed, when we are at home page
router.get("/:userId/posts", verifyToken, getUserPosts); // this takes relevent published posts related to the user by  user ID

/**Update */
router.patch("/:id/like", verifyToken, likePost); // this is for liking/unliking the post


export default router;
