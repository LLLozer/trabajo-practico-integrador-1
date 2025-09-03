import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

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

UserModel.hasOne(ProfileModel, { foreignKey: "user_id" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.addHook("afterDestroy", async (user) => {
  const profile = await ProfileModel.findOne({
    where: { user_id: user.dataValues.id },
  });
  await profile.destroy();
});
