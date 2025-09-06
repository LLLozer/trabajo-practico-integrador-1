import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TagModel = sequelize.define(
  "Tag",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      len: [2, 30],
    },
  },
);