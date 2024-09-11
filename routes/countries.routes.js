const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getAllCountries,
  addNewCountry,
  getCountryByPK,
  deleteCountry,
  updateCountry,
} = require("../controllers/countries.controller");
const countriesRouter = express.Router();

countriesRouter
  .route("/")
  .get(asyncHandler(getAllCountries))
  .post(asyncHandler(addNewCountry));

countriesRouter
  .route("/:id")
  .get(asyncHandler(getCountryByPK))
  .delete(asyncHandler(deleteCountry))
  .put(asyncHandler(updateCountry));

module.exports = countriesRouter;
