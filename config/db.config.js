const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();


const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: 'localhost',
  logging: console.log, // Enable query logging for debugging
});
module.exports = sequelize;
