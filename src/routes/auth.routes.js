import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
  updateProfile,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/profile", authMiddleware, profile);
authRoutes.put("/profile", authMiddleware, updateProfile);

export default authRoutes;
