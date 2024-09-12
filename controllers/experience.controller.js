const Experience = require("../models/experience.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllExperience = async (req, res, next) => {
  const experiences = await Experience.findAll({});

  res.status(200).json({ status: "success", data: { experiences } });
};

module.exports.getOneExperience = async (req, res, next) => {
  const { userId, id } = req.params;
  const experience = await Experience.findOne({
    where: {
      startDate: new Date(id),
      user_id:userId,
    },
  });

  if (!experience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: { experience } });
};

module.exports.createExperience = async (req, res, next) => {
  const createdData = req.body;

  const experience = await Experience.create(createdData);

  res.status(201).json({ status: "success", data: { experience } });
};

module.exports.updateExperience = async (req, res, next) => {
  const  updatedData  = req.body;
  const { userId, id } = req.params;

  const updatedExperience = await Experience.update(updatedData, {
    where: {
      startDate: new Date(id),
      user_id:userId,
    },
  });
  if (updatedExperience.affectedRows == 0) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: { updatedExperience } });
};

module.exports.deleteExperience = async (req, res, next) => {
  const { userId, id } = req.params;
  const deletedExperience = await Experience.destroy({
    where: {
      startDate: new Date(id),
      user_id:userId,
    },
  });
  if (!deletedExperience) {
    return next(new ApiError("experience is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
