const Permissions = require("../models/permissions.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllPermissions = async (req, res, next) => {
  const permissions = await Permissions.findAll({});

  res.status(200).json({ status: "success", data: { permissions } });
};

module.exports.getOnePermission = async (req, res, next) => {
  const { id } = req.params;
  const permission = await Permissions.findOne({where:{id}});
  if (!permission) {
    return next(new ApiError("permission is not found", 404));
  }
  res.status(200).json({ status: "success", data: { permission } });
};

module.exports.createNewPermission = async (req, res, next) => {
  const createdData = req.body;

  const permission = await Permissions.create(createdData);
  res.status(201).json({ status: "success", data: { permission } });
};

module.exports.updatePermission = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedPermission = await Permissions.update(updatedData, {
    where: { id },
  });
  if (!updatedPermission) {
    return next(new ApiError("permission is not found", 404));
  }
  res.status(200).json({ status: "success", data: { updatedPermission } });
};

module.exports.deletePermission = async (req, res, next) => {
  const { id } = req.params;

  const deletedPermission = await Permissions.destroy({ where: { id } });
  if (!deletedPermission) {
    return next(new ApiError("permission is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};
