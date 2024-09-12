const joi = require("joi");

module.exports.validateAddCountry = joi.object({
  countryKey: joi.string().min(1).max(510).required().trim(),
  countryName: joi.string().min(3).max(50).required().trim(),
});

module.exports.validateEditCountry = joi.object({
  id: joi.number().integer().positive().required(),
  countryKey: joi.string().min(1).max(510).required().trim(),
  countryName: joi.string().min(3).max(50).required().trim(),
});
