import { Router } from "express";
import {
  createArticle,
  findAllArticles,
  findArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { ownerMiddleware } from "../middlewares/authOwner.js"
import { createArticleValidation, updateArticleValidation, getArticleIDValidation, deleteArticleValidation} from "../middlewares/validations/article.validations.js"
import { validator } from "../middlewares/validations/validator/validator.js"

export const articleRoutes = Router();

articleRoutes.get("/articles/", authMiddleware, findAllArticles);
articleRoutes.get("/articles/:id", getArticleIDValidation, validator, authMiddleware, findArticleById);
articleRoutes.post("/articles/", createArticleValidation, validator, authMiddleware, createArticle);
articleRoutes.post("/articles/user/", authMiddleware,)
articleRoutes.put(
  "/articles/:id",
  updateArticleValidation,
  validator,
  authMiddleware,
  ownerMiddleware,
  updateArticle
);
articleRoutes.delete(
  "/articles/:id",
  deleteArticleValidation,
  validator,
  authMiddleware,
  ownerMiddleware,
  deleteArticle
);
