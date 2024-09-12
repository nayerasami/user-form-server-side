const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getAllCountries,
  addNewCountry,
  getCountryByPK,
  deleteCountry,
  updateCountry,
} = require("../controllers/countries.controller");
const {validation }=require('../middlewares/validations/validation');
const { validateAddCountry, validateEditCountry } = require("../middlewares/validations/countries.validation");

const countriesRouter = express.Router();

countriesRouter
  .route("/")
  .get(asyncHandler(getAllCountries))
  .post(validation(validateAddCountry),asyncHandler(addNewCountry));

countriesRouter
  .route("/:id")
  .get(asyncHandler(getCountryByPK))
  .delete(asyncHandler(deleteCountry))
  .put(validation(validateEditCountry),asyncHandler(updateCountry));

module.exports = countriesRouter;
