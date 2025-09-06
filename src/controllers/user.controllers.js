import { ArticleModel } from "../models/article.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const findAllUsers = async (req, res) => {
  const findAll = await UserModel.findAll({
    include: {
      model: ProfileModel,
      as: "profile",
    },
  });
  res.status(200).json(findAll);
};

export const findUserById = async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    if (isNaN(userID)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }

    const findID = await UserModel.findByPk(userID, {
      include: {
        model: ProfileModel,
        as: "profile",
      },
      include: {
        model: ArticleModel,
        as: "articles",
      },
    });

    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        status: 404,
      });
    }
    res.status(200).json(findID);
  } catch (error) {
    console.log(error)
    return res.status(500).json("Error: No se pudo encontrar el ID");
  }
};

export const updateUser = async (req, res) => {
  const userID = parseInt(req.params.id);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(userID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findID = await UserModel.findByPk(userID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const checkIfEmailExists = await UserModel.findOne({
      where: { email: email, id: { [Op.ne]: id } },
    });
    if (checkIfEmailExists) {
      return res.status(400).json({
        message: "Error: Ese usuario ya existe",
        error: "Bad request",
        status: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    await findID.update({ username, email, password });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar usuario",
      error: "Internal server error",
      status: 500,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userID = parseInt(req.params.id);
  const findID = await UserModel.findByPk(userID);
  if (isNaN(userID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese usuario no existe",
        error: "Not found",
        status: 404,
      });
    }
    const deleteData = await findID.destroy();
    res.status(200).json("Usuario eliminado.");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar el usuario",
      error: "Internal server error",
      status: 500,
    });
  }
};
