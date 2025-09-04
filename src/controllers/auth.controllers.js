import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { ProfileModel } from "../models/profile.model.js";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    first_name,
    last_name,
    biography,
    avatar_url,
    birthday,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const checkIfUserExists = await UserModel.findOne({
      where: { username: username },
    });
    if (checkIfUserExists) {
      return res.status(400).json({
        message: "Ese usuario ya está registrado",
      });
    }

    const checkIfEmailExists = await UserModel.findOne({
      where: { email: email },
    });
    if (checkIfEmailExists) {
      return res.status(400).json({
        message: "Ese email ya está registrado",
      });
    }

    const user = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await ProfileModel.create({
      first_name: first_name,
      last_name: last_name,
      biography: biography,
      avatar_url: avatar_url,
      birthday: birthday,
      user_id: user.id,
    });

    res.status(201).json({
      msg: "Usuario registrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      where: { username: username },
      include: {
        model: ProfileModel,
        as: "profile",
        attributes: ["first_name", "last_name"],
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user); //Generar el token usando la función desde jwt.helper.js//

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Sesión iniciada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor.",
    });
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout exitoso" });
};

export const profile = async (req, res) => {
  const user = req.userLogged;
  try {
    res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    return res.status(500).json("Error interno del servidor.");
  }
};