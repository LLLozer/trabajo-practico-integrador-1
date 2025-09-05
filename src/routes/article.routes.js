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
import { ownerMiddleware } from "../middlewares/authOwner.js"

export const articleRoutes = Router();

articleRoutes.get("/articles/", authMiddleware, findAllArticles);
articleRoutes.get("/articles/:id", authMiddleware, findArticleById);
articleRoutes.post("/articles/", authMiddleware, createArticle);
articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  //authOwnerMiddleware,
  // updateArticle,
  authAdminMiddleware,
  updateArticle
);
articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  ownerMiddleware,
  //authOwnerMiddleware,
  // deleteArticle,
  authAdminMiddleware,
  deleteArticle
);
