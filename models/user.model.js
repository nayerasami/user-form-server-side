const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Countries = require("./countries.model");

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstNameAR: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[\\u0600-\\u06FF\\s]+$/i,
    },
  },
  lastNameAR: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[\\u0600-\\u06FF\\s]+$/i,
    },
  },
  firstNameEN: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]+$/i,
    },
  },
  lastNameEN: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]+$/i,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$/i,
    },
  },
  cityKey: {
    type: DataTypes.INTEGER,
    references: {
      model: Countries,
      key: "country_id",
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]+$/i,
    },
  },
  nationalID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]+$/i,
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  addressAr: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[\\u0600-\\u06FF\\s]+$/i,
    },
  },
  addressEN: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]+$/i,
    },
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: false,
  },
  maritalStatus: {
    type: DataTypes.ENUM("Single", "Divorced", "Married", "Widower"),
    allowNull: false,
  },
});

module.exports = User;
