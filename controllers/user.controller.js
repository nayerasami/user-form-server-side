const sequelize = require("../config/db.config");
const Countries = require("../models/countries.model");
const Experience = require("../models/experience.model");
const Permissions = require("../models/permissions.model");
const User = require("../models/user.model");
const userPermissions = require("../models/user_permissions");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["phoneKey"],
    },
    include: [
      {
        model: Countries,
        attributes: ["countryKey"],
      },
      {
        model: Permissions,
      },
      {
        model: Experience,
        as: "userExperience",
      },
    ],
  });

  res.status(200).json({ status: "success", data: { users } });
};

module.exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: {
      exclude: ["phoneKey"],
    },
    include: [
      {
        model: Countries,
        attributes: ["countryKey"],
      },
      {
        model: Permissions,
      },
      {
        model: Experience,
        as: "userExperience",
      },
    ],
  });
  if (!user) {
    return next(new ApiError("user is not found", 404));
  }
  res.status(200).json({ status: "success", data: { user } });
};

module.exports.createUser = async (req, res, next) => {
  const {
    firstNameAR,
    lastNameAR,
    firstNameEN,
    lastNameEN,
    email,
    phoneKey,
    phoneNumber,
    nationalID,
    birthDate,
    addressAr,
    addressEN,
    gender,
    maritalStatus,
    userExperience,
    permissions,
  } = req.body;

  console.log(permissions, "permissions array")
  if (!email) {
    return next(new ApiError("Email is required", 400));
  }

  const transaction = await sequelize.transaction();

  try {
    const existedUserEmail = await User.findOne({
      where: { email },
      transaction,
    });
    if (existedUserEmail) {
      return next(new ApiError("This user email already exists", 409));
    }

    const country = await Countries.findOne({
      where: { id: phoneKey },
      transaction,
    });
    if (!country) {
      return next(new ApiError("Country key is not found", 404));
    }

    const existedUserPhone = await User.findOne({
      where: { phoneNumber },
      transaction,
    });
    if (existedUserPhone) {
      return next(new ApiError("This user phone number already exists", 409));
    }

    const existedUserID = await User.findOne({
      where: { nationalID },
      transaction,
    });
    if (existedUserID) {
      return next(new ApiError("This user national ID already exists", 409));
    }

    const user = await User.create(
      {
        firstNameAR,
        lastNameAR,
        firstNameEN,
        lastNameEN,
        email,
        phoneKey,
        phoneNumber,
        nationalID,
        birthDate,
        addressAr,
        addressEN,
        gender,
        maritalStatus,
        userExperience,
      },
      {
        include: [
          { model: Countries, attributes: ["countryKey"] },
          { model: Experience, as: 'userExperience' },
        ],
        transaction,
      }
    );

    if (!user) {
      return next(new ApiError("User creation failed", 500));
    }


    const existedPermission = await Permissions.findOne({ where: { id: permissions.permissionId } });
    if (!existedPermission) {
      return next(new ApiError("permission is not found", 404));
    }

    console.log(existedPermission, "existed permission ")


      const userPermission = await user.addPermissions(existedPermission, {
        transaction,
      });
   

    await transaction.commit();

    res.status(201).json({ status: "success", data: { user } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const updatedData = req.body;
  const { id } = req.params;

  const [affectedRows] = await User.update(updatedData, { where: { id } });
  if (affectedRows === 0) {
    return next(new ApiError("user not found", 404));
  }
  const updatedUser = await User.findOne({ where: { id } });
  res.status(200).json({ status: "success", data: { updatedUser } });
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await User.destroy({ where: { id } });
  console.log(deletedUser, "deleted user");
  if (deletedUser === 0) {
    return next(new ApiError("user not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};

module.exports.CheckEmail = async (req, res, next) => {
  console.log("Check-email route hit");
  const { email } = req.query;

  const user = await User.findOne({ where: { email } });
  if (user) {
    res.status(200).json({ exist: true });
  }

  res.status(200).json({ exist: false });
};

module.exports.checkNationalID = async (req, res, next) => {
  const { nationalID } = req.query;

  const user = await User.findOne({ where: { nationalID } });
  if (user) {
    res.status(200).json({ exist: true });
  }
  res.status(200).json({ exist: false });
};

module.exports.checkPhone = async (req, res, next) => {
  const { phoneNumber } = req.query;

  const user = await User.findOne({ where: { phoneNumber } });
  if (user) {
    res.status(200).json({ exist: true });
  }
  res.status(200).json({ exist: false });
};
