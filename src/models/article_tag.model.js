import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTagModel = sequelize.define(
  "Article_Tag",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
  },
);