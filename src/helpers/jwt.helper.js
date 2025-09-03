import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Generación y validación de tokens//

export const generateToken = (user) => {
  try {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error("Error al generar el token: " + error.message);
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error al verificar el token:" + error.message);
  }
};

//Hasheo de contraseña y verificación//

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
