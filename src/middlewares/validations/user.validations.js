import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
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
    .isAlphanumeric()
    .withMessage("El username debe contener caracteres alfanuméricos.")
    .isLength({ min: 3, max: 20 }),
  body("email")
    .trim()
    .isEmail()
    .custom(async (value) => {
      const emailExists = UserModel.findOne({ where: { email: value } });
      if (emailExists) {
        throw new Error("Ese email ya se ha registrado.");
      }
    }),
  body("password")
    .matches("[0-9]").withMessage("La contraseña debe tener un número")
    .matches("[A-Z]").withMessage("La contraseña debe contener al menos una mayúscula")
    .matches("[a-z]").withMessage("La contraseña debe tener al menos una minúscula")
];
