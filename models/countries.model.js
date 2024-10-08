const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Countries = sequelize.define("countries", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  countryKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: false });



module.exports = Countries;
