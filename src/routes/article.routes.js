import { Router } from "express";
import {
  createArticle,
  findAllArticles,
  findArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";

const articleRoutes = Router();

articleRoutes.get("/articles/", authMiddleware, findAllArticles);
articleRoutes.get("/articles/:id", authMiddleware, findArticleById);
articleRoutes.post("/articles/", authMiddleware, createArticle);
articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  authAdminMiddleware,
  updateArticle
);
articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteArticle
);
