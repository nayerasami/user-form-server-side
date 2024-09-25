const Experience = require("../models/experience.model");
const ApiError = require("../utilities/ErrorClass");
const User =require('../models/user.model')

module.exports.getAllExperience = async (req, res, next) => {
  const experiences = await Experience.findAll({});

  res.status(200).json({ status: "success", data: { experiences } });
};

module.exports.getOneExperience = async (req, res, next) => {
  const { userId, id } = req.params;
  const experience = await Experience.findOne({
    where: {
      id,
      user_id: userId,
    },
  });

  if (!experience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: { experience } });
};

module.exports.createExperience = async (req, res, next) => {
  const { user_id,startDate,companyName,endDate,currentlyWorking} = req.body;
  const userExists = await User.findOne({ where: { id: user_id } });
    
  if (!userExists) {
    return next(new ApiError("User not found", 404));
  }
  const experience = await Experience.create( { user_id,startDate,companyName,endDate,currentlyWorking} );

  res.status(201).json({ status: "success", data: { experience } });
};

module.exports.updateExperience = async (req, res, next) => {
  const updatedData = req.body;
  const { userId, id } = req.params;

  const [affectedRows] = await Experience.update(updatedData, {
    where: {
      id,
      user_id: userId,
    },
  });
  if (affectedRows === 0) {
    return next(new ApiError("experience is not found", 404));
  }
  const updatedExperience = await Experience.findOne({
    where: {
      id,
      user_id: userId,
    },
  });
  res.status(200).json({ status: "success", data: { updatedExperience } });
};

module.exports.deleteExperience = async (req, res, next) => {
  const { userId, id } = req.params;
  const deletedExperience = await Experience.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
  if (deletedExperience === 0) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};