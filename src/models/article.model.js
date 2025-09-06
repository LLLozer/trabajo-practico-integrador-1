import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define("Article", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    len: [3, 200],
  },
  content: {
    type: DataTypes.TEXT(),
    min: 50,
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("published", "archived"),
    defaultValue: "published",
  },
});

UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles" });
ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
