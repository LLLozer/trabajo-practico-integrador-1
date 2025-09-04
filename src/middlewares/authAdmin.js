export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.user;
  if (!decoded.role !== "admin") {
    return res.status(401).json({
      msg: "Permiso denegado",
    });
  }
  next();
};
