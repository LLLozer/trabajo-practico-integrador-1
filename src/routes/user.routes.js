import { Router } from "express";
import {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import {
  updateUserValidation,
  getUserIDValidation,
  deleteUserValidation,
} from "../middlewares/validations/user.validations.js";
import { validator } from "../middlewares/validations/validator/validator.js";

export const userRoutes = Router();

userRoutes.get("/users", authMiddleware, authAdminMiddleware, findAllUsers);
userRoutes.get(
  "/users/:id",
  getUserIDValidation,
  validator,
  authMiddleware,
  authAdminMiddleware,
  findUserById
);
userRoutes.put(
  "/users/:id",
  updateUserValidation,
  validator,
  authMiddleware,
  authAdminMiddleware,
  updateUser
);
userRoutes.delete(
  "/users/:id",
  deleteUserValidation,
  authMiddleware,
  authAdminMiddleware,
  deleteUser
);

export default userRoutes;
