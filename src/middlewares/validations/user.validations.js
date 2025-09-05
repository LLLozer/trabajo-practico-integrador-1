import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const createUserValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
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
    .length({ min: 8 })
    .matches("/^(?=.*[a-z])(?*=.[A-Z])(?=.*d)[A-Za-zd]{8,}$/")
    .withMessage(
      "El password debe tener al menos una minúscula, una mayúscula y un número"
    ),
  body("role").custom((async) => {
    if (param.UserModel.role !== "user" || "admin")
      throw new Error("El campo role solo acepta user o admin");
  }),
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
  body("username")
    .trim()
    .optional()
    .isAlphanumeric()
    .withMessage("El campo username debe ser alfanumérico")
    .isLength({ min: 3, max: 20 })
    .withMessage("El first_name debe ser entre 2 y 15 caracteres"),
  body("email")
    .trim()
    .optional()
    .isEmail()
    .custom(async (value) => {
      const emailExists = UserModel.findOne({
        where: { email: value, id: { [Op.ne]: req.params.id } },
      });
      if (emailExists) {
        throw new Error("Ese email ya se ha registrado.");
      }
    }),
  body("password")
    .trim()
    .optional()
    .length({ min: 8 })
    .matches("/^(?=.*[a-z])(?*=.[A-Z])(?=.*d)[A-Za-zd]{8,}$/")
    .withMessage(
      "El password debe tener al menos una minúscula, una mayúscula y un número"
    ),
  body("role")
    .optional()
    .custom((async) => {
      if (param.UserModel.role !== "user" || "admin")
        throw new Error("El campo role solo acepta user o admin");
    }),
];

export const getUserIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const deleteUserValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];
