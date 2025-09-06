import { Router } from "express";
import {
  getAll,
  getById,
  updateArticleTag,
  createNewArticleTag,
  deleteArticleTag,
} from "../controllers/article_tag.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { ownerMiddleware } from "../middlewares/authOwner.js";

export const articleTagRoutes = Router();

articleTagRoutes.post("/articles-tags", createNewArticleTag);
articleTagRoutes.delete("/articles-tags", ownerMiddleware, deleteArticleTag);

export default articleTagRoutes;
