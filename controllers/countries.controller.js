const Countries = require("../models/countries.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllCountries = async (req, res, next) => {
  const countries = await Countries.findAll({});

  res.status(200).json({ status: "success", data: { countries } });
};

module.exports.getCountryByPK = async (req, res, next) => {
  const { id } = req.params;
  const country = await Countries.findByPk(id);
  if (!country) {
    return next(new ApiError("country not found", 404));
  }
  res.status(200).json({ status: "success", data: { country } });
};

module.exports.addNewCountry = async (req, res, next) => {
  const newCountryData = req.body;

  const newCountry = await Countries.create(newCountryData);
  res.status(201).json({ status: "success", data: { newCountry } });
};

module.exports.updateCountry = async (req, res, next) => {
  const updatedData = req.body;
  const { id } = req.params;

  const updatedCountry = await Countries.update(updatedData, { where: { id } });

  if (!updatedCountry) {
    return next(new ApiError("country not found", 404));
  }
  res.status(200).json({ status: "success", data: { updatedCountry } });
};

module.exports.deleteCountry = async (req, res, next) => {
  const { id } = req.params;
  const deletedCountry = await Countries.destroy({ where: { id } });
  if (!deletedCountry) {
    return next(new ApiError("country not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
