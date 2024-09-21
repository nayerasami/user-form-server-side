const sequelize = require("../config/db.config");
const { Op, where } = require("sequelize");
const Countries = require("../models/countries.model");
const Experience = require("../models/experience.model");
const Permissions = require("../models/permissions.model");
const User = require("../models/user.model");
const UserPermissions = require("../models/user_permissions");
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

  const userData = {
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
  }
  if (!userExperience) {
    return next(new ApiError('User Experience is required', 400))
  }
  if (!permissions) {
    return next(new ApiError("Permission is required", 400));
  }
  const transaction = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { phoneNumber },
          { nationalID }
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return next(new ApiError("This user email already exists", 409));
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return next(new ApiError("This user phone number already exists", 409));
      }
      if (existingUser.nationalID === nationalID) {
        return next(new ApiError("This user national ID already exists", 409));
      }
    }

    const country = await Countries.findByPk(phoneKey);
    if (!country) {
      return next(new ApiError("Country key is not found", 404));
    }


    const user = await User.create(
      userData,
      {
        include: [
          { model: Countries, attributes: ["countryKey"] },
          { model: Experience, as: "userExperience" },
        ],
        transaction,
      }
    );
    if (!user) {
      return next(new ApiError("User creation failed", 500));
    }

    if (permissions && permissions.length) {
      const userPermissionsArr = permissions.map((permission) => {
        return { userId: user.id, permissionId: permission.permissionId };
      });
      const addedUserPermissions = await UserPermissions.bulkCreate(userPermissionsArr, { transaction });

    }

    await transaction.commit();

    res.status(201).json({ status: "success", data: { user } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
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
  const userData = {
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
    maritalStatus
  }
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { id }, transaction });
    console.log(user, "user data");
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    await user.update(
      userData,
      { transaction }
    );

    if (userExperience) {
      const existingExperiences = await user.getUserExperience({ transaction });
      console.log(existingExperiences,"existing Experiences")
      const existingExpIds = existingExperiences.map(exp => exp.id);
      console.log(existingExpIds,"existing user ids arr")
      await Promise.all(userExperience.map(async (exp, index) => {
        if (existingExpIds[index]) {
          await existingExperiences[index].update({ 
            ...exp, 
            user_id: id 
          }, { transaction });
        } else {
          await Experience.create({
            ...exp,
            user_id: user.id,
          }, { transaction });
        }
      }));
    }

    if (permissions && permissions.length) {
      // const userPermissionsArr = permissions.map(permission => permission.permissionId);
      // await user.setPermissions(userPermissionsArr, { transaction });
      await user.setPermissions(permissions.map(p => p.permissionId), { transaction });
    }
    
    await transaction.commit();

    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
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
