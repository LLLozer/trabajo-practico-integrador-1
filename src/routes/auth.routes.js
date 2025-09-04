import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
} from "../controllers/auth.controllers.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import { authMiddleware } from "../middlewares/auth.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/profile", authMiddleware, profile);

export default authRoutes;
