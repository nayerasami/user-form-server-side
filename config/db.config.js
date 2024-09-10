const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();



const sequelize = new Sequelize( process.env.DB, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
  logging:true
});

module.exports = sequelize;
