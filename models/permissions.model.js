const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Permissions = sequelize.define("permissions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
} , { timestamps: false }
);


module.exports = Permissions;
