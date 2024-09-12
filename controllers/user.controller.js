const Countries = require("../models/countries.model");
const User = require("../models/user.model");
const ApiError = require("../utilities/ErrorClass");

module.exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["phoneKey"],
    },
    include: {
      model: Countries,
      attributes: ["countryKey"],
    },
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
    include: {
      model: Countries,
      attributes: ["countryKey"],
    },
  });
  if (!user) {
    return next(new ApiError("user is not found", 404));
  }
  res.status(200).json({ status: "success", data: { user } });
};

module.exports.createUser = async (req, res, next) => {
  const createdData = req.body;
  const { email, nationalID, phoneNumber ,phoneKey} = req.body;
  const existedUserEmail = await User.findOne({ where: { email } });

  const country =Countries.findOne({where:{id:phoneKey}})
  if(!country){
    return next(new ApiError('country key is not found',404))
  }
  if (existedUserEmail) {
    return next(new ApiError("this user email already exist", 409));
  }

  const existedUserPhone = await User.findOne({ where: { phoneNumber } });
  if (existedUserPhone) {
    return next(new ApiError("this user phone number already exist", 409));
  }

  const existedUserID = await User.findOne({ where: { nationalID } });

  if (existedUserID) {
    return next(new ApiError("this user national id already exist ", 409));
  }

  const user = await User.create(createdData);

  res.status(201).json({ status: "success", data: { user } });
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
  console.log(deletedUser,"deleted user")
  if (deletedUser === 0) {
    return next(new ApiError("user not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};

module.exports.CheckEmail =async(req,res,next)=>{
const { email }=req.query;

const user =await User.findOne({where:{email}})
if(user){
  return next(new ApiError('this email already in use',409))
}
res.status(200).json({ message: 'Email is available' });

}


