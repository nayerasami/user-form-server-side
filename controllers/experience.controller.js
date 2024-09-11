const Experience = require("../models/experience.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllExperience = async (req, res, next) => {
  const experiences = await Experience.findAll({});

  res.status(200).json({ status: "success", data: { experiences } });
};

module.exports.getOneExperience = async (req, res, next) => {
  const { user_id, startDate } = req.body;
  const experience = await Experience.findOne({
    where: {
      startDate,
      user_id,
    },
  });

  if (!experience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: { experience } });
};

module.exports.createExperience = async (req, res, next) => {
  const { user_id, startDate, createdData } = req.body;

  const experience = await Experience.create({
    user_id,
    startDate,
    createdData,
  });

  res.status(201).json({ status: "success", data: { experience } });
};

module.exports.updateExperience = async (req, res, next) => {
  const { user_id, startDate, updatedData } = req.body;

  const updatedExperience = await Experience.update(updatedData, {
    where: {
      startDate,
      user_id,
    },
  });
  if (!updatedExperience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: { experience } });
};

module.exports.deleteExperience = async (req, res, next) => {
  const { user_id, startDate } = req.body;
  const deletedExperience = await Experience.destroy({
    where: {
      startDate,
      user_id,
    },
  });
  if (!deletedExperience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
