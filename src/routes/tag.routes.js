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

export const tagRoutes = Router();

tagRoutes.get("/tags", authMiddleware, findAllTags);
tagRoutes.post("/tags", authMiddleware, authAdminMiddleware, createTag);
tagRoutes.get("/tags/:id", authMiddleware, authAdminMiddleware, findTagById);
tagRoutes.put("/tags/:id", authMiddleware, authAdminMiddleware, updateTag);
tagRoutes.delete("/tags/:id", authMiddleware, authAdminMiddleware, deleteTag);

export default tagRoutes;