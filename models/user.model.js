const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Countries = require("./countries.model");


const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstNameAR: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[\u0600-\u06FF\s]+$/u,

        },
  },
  lastNameAR: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: /^[\u0600-\u06FF\s]+$/u,
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
    validate: {
      is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    },
  },
  phoneKey: {
    type: DataTypes.INTEGER,
    references: {
      model: Countries,
      key: "id",
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/i,
    },
  },
  nationalID: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/i,
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDateInThePast(value) {
        const currentDate = new Date();
        const selectedDate = value;
        if (selectedDate >= currentDate) {
          throw new Error("Date Must Be in the past");
        }
      },
    },
  },
  addressAr: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: /^[\u0600-\u06FF\s]+$/u,
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
},{indexes:[
  {unique:true, fields: ['email']},
  {unique:true, fields: ['nationalID']},
  {unique:true, fields: ['phoneNumber']},

]});



module.exports = User;
