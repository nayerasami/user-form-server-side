const Countries = require("../models/countries.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllCountries = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const countries = await Countries.findAll({});
  let searchArray = countries;

  const totalNumber = countries.length;
  const numberOfPages = Math.ceil(totalNumber / limit);

  if (search) {
    searchArray = countries.filter((country) => {
      return country.countryName.toLowerCase().includes(search);
    });
  }

  const countriesArr = searchArray.slice(startIndex, endIndex);

  res.status(200).json({ status: "success" , data: { totalNumber, page, numberOfPages, items: countriesArr }});
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
  const { countryName, countryKey } = req.body;

  const existedCountryName = await Countries.findOne({
    where: { countryName },
  });

  if (existedCountryName) {
    return next(new ApiError("this country name already exist ", 409));
  }
  const newCountry = await Countries.create({ countryName, countryKey });

  
  res.status(201).json({ status: "success", data: { newCountry } });
};

module.exports.updateCountry = async (req, res, next) => {
  const updatedData = req.body;
  const { id } = req.params;
  const [affectedRows] = await Countries.update(updatedData, { where: { id } });

  if (affectedRows === 0) {
    return next(new ApiError("Country not found", 404));
  }
  const updatedCountry = await Countries.findOne({ where: { id } });

  res.status(200).json({ status: "success", data: { updatedCountry } });
};

module.exports.deleteCountry = async (req, res, next) => {
  const { id } = req.params;
  const deletedCountry = await Countries.destroy({ where: { id } });
  if (deletedCountry === 0) {
    return next(new ApiError("country not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
