import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const createUserValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El campo username debe contener entre 3 y 20 caracteres")
    .custom(async (value) => {
      const userExists = await UserModel.findOne({
        where: { username: value },
      });
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
      const emailExists = await UserModel.findOne({ where: { email: value } });
      if (emailExists) {
        throw new Error("Ese email ya se ha registrado.");
      }
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "El password debe tener al menos una minúscula, una mayúscula y un número, y debe tener al menos 8 caracteres"
    ),
  body("role")
    .optional()
    .custom(async (value) => {
      const admittedRoles = ["user", "admin"];
      if (!admittedRoles.includes(value)) {
        throw new Error("El campo role solo admite user o admin");
      }
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
      const emailExists = await UserModel.findOne({
        where: { email: value, id: { [Op.ne]: req.params.id } },
      });
      if (emailExists) {
        throw new Error("Ese email ya se ha registrado.");
      }
    }),
  body("password")
    .trim()
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "El password debe tener al menos una minúscula, una mayúscula y un número"
    ),
  body("role")
    .optional()
    .custom(async (value) => {
      const admittedRoles = ["user", "admin"];
      if (!admittedRoles.includes(value)) {
        throw new Error("El campo role solo admite user o admin");
      }
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
