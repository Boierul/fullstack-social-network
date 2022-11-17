import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// instead of app.use, router.post is used
// register is not here because of middleware
router.post("/login", login);

export default router;
