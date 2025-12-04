import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register",authMiddleware, registerUser);
router.post("/login",authMiddleware, loginUser);

export default router;