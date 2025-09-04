import { Router } from "express";
import {
  createTag,
  findAllTags,
  findTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";

export const taskRoutes = Router();

taskRoutes.get("/tags", authMiddleware, findAllTags);
taskRoutes.post("/tags", authMiddleware, authAdminMiddleware, createTag);
taskRoutes.get("/tags/:id", authMiddleware, authAdminMiddleware, findTagById);
taskRoutes.put("/tags/:id", authMiddleware, authAdminMiddleware, updateTag);
taskRoutes.delete("/tags/:id", authMiddleware, authAdminMiddleware, deleteTag);

export default taskRoutes;