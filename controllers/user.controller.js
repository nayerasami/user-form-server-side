const Countries = require("../models/countries.model");
const User = require("../models/user.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll({});

  res.status(200).json({ status: "success", data: { users } });
};

module.exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id }, include: Countries });
  if (!user) {
    return next(new ApiError("user is not found", 404));
  }
  res.status(200).json({ status: "success", data: { user } });
};

module.exports.createUser = async (req, res, next) => {
  const createdData = req.body;
  const user = await User.create(createdData);

  res.status(201).json({ status: "success", data: { user } });
};

module.exports.updateUser = async (req, res, next) => {
  const updatedData = req.body;
  const { id } = req.params;

  const updatedUser = await User.update(updatedData, { where: { id } });
  if (!updatedUser) {
    return next(new ApiError("user is not found", 404));
  }
  res.status(200).json({ status: "success", data: { updatedUser } });
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await User.destroy({ where: { id } });
  if (!deletedUser) {
    return next(new ApiError("user is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
