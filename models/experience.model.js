const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Experience = sequelize.define("experience", {
  user_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDateInThePast(value) {
        const currentDate = Date.now();
        const selectedDate = value;
        if (selectedDate >= currentDate) {
          throw new Error("Date Must Be in the past");
        }
      },
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDateInThePast(value) {
        const currentDate = Date.now();
        const selectedDate = value;
        if (selectedDate >= currentDate) {
          throw new Error("Date Must Be in the past");
        }
      },
      checkEndDateAndJoinDate(value) {
        if (value <= this.startDate) {
          throw new Error("Inappropriate Date ");
        }
      },
    },
  },
  currentlyWorking: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Experience;
