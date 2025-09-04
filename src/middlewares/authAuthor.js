import { ArticleModel } from "../models/article.model.js";

const authAuthorMiddleware = async (req, res, next) => {
  try {
    const user = req.userLogged;
    const article = await ArticleModel.findByPk(req.params.id);
    if (article.dataValues.id !== user.id) {
      return res.status(401).json({
        msg: "Permiso denegado",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json("Error interno del servidor");
  }
};
