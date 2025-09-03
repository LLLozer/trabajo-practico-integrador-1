import { body, param } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { Op } from "sequelize";

export const createUserValidation = [
  body("username")
    .trim()
    .custom(async (value) => {
      const userExists = UserModel.findOne({ where: { username: value } });
      if (userExists) {
        throw new Error("Ese usuario ya está registrado");
      }
    })
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .isString()
    .withMessage("El username debe contener caracteres alfanuméricos.")
    .isLength({ min: 3, max: 20 }),
];
