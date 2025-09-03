import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      len: [3, 20],
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true,
        unique: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    paranoid: true,
  }
);
