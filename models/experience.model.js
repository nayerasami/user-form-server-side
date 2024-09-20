const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Experience = sequelize.define("experience", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true,  
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDateInThePast(value) {
        const currentDate = new Date();
        const selectedDate = value;
        if (selectedDate >= currentDate) {
          throw new Error("Date must be in the past");
        }
      },
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDateInThePast(value) {
        const currentDate = new Date();
        const selectedDate = value;
        if (selectedDate >= currentDate) {
          throw new Error("Date must be in the past");
        }
      },
      checkEndDateAndJoinDate(value) {
        if (value <= this.startDate) {
          throw new Error("End date cannot be earlier than start date");
        }
      },
    },
  },
  currentlyWorking: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, { timestamps: false });

module.exports = Experience;
