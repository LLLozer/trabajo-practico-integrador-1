import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userLogged = decoded;
};
