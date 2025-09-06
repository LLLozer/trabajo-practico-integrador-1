import { ArticleTagModel } from "../models/article_tag.model.js";
import { TagModel } from "../models/tag.model.js"
import { ArticleModel } from "../models/article.model.js";

export const getAll = async (req, res) => {
  try {
    const getAllStuff = await ArticleTagModel.findAll({
      include: [
        {
          model: ArticleModel,
          as: "articles",
        },
        {
          model: TagModel,
          as: "tags",
        },
      ],
    });
    res.status(200).json(getAllStuff);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

export const getById = async (req, res) => {
  const ArticleTagId = parseInt(req.params.id);
  try {
    if (isNaN(ArticleTagId)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const findId = await ArticleTagModel.findByPk(ArticleTagId);
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        status: 404,
      });
    }
    res.status(200).json(findId);
  } catch (error) {
    return res.status(500).json("Error: No se pudo encontrar el ID");
  }
};

export const createNewArticleTag = async (req, res) => {
  const { article_id, tag_id } = req.body;
  try {
    if (!article_id || !tag_id) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos",
        error: "Bad request",
        status: 400,
      });
    }
    const createNew = await ArticleTagModel.create(req.body);
    res.status(200).json(createNew);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateArticleTag = async (req, res) => {
  const ArticleTagId = parseInt(req.params.id);
  const { article_id, tag_id } = req.body;
  if (!article_id || !tag_id) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(ArticleTagId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findId = await ArticleTagModel.findByPk(ArticleTagId);
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    await findId.update({ article_id, tag_id });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar los datos",
      error: "Internal server error",
      status: 500,
    });
  }
};

export const deleteArticleTag = async (req, res) => {
  const ArticleTagId = parseInt(req.params.id);
  const findId = await ArticleModel.findByPk(ArticleTagId);
  if (isNaN(ArticleTagId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const deleteArticleTag = await findId.destroy();
    res.status(200).json("Datos eliminados");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar el registro",
      error: "Internal server error",
      status: 500,
    });
  }
};