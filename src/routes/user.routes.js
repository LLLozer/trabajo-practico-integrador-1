import { Router } from "express";
import {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";

export const userRoutes = Router();

userRoutes.get("/users", authMiddleware, authAdminMiddleware, findAllUsers);
userRoutes.get("/users/:id", authMiddleware, authAdminMiddleware, findUserById);
userRoutes.put("/users/:id", authMiddleware, authAdminMiddleware, updateUser);
userRoutes.delete(
  "/users/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteUser
);

export default userRoutes;
