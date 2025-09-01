import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("Profile", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
  },
  last_name: {
    type: DataTypes.STRING(50),
  },
  biography: {
    type: DataTypes.TEXT(),
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
});
