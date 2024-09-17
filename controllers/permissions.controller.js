const Permissions = require("../models/permissions.model");
const User = require("../models/user.model");
const userPermissions = require("../models/user_permissions");
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
  const {permission} = req.body;

  const newPermission = await Permissions.create({permission});
  const exitedPermission =await Permissions.findOne({where:{permission}})

  if(exitedPermission){
    return next(new ApiError('this permission already exist',409))
  }
  res.status(201).json({ status: "success", data: { newPermission } });
};

module.exports.updatePermission = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const [affectedRows] = await Permissions.update(updatedData, {
    where: { id },
  });
  console.log(affectedRows,"affected rows")
  if (affectedRows === 0) {
    return next(new ApiError("permission is not found", 404));
  }
  const updatedPermission =await Permissions.findOne({where:{id}})

  res.status(200).json({ status: "success", data: { updatedPermission } });
};

module.exports.deletePermission = async (req, res, next) => {
  const { id } = req.params;

  const deletedPermission = await Permissions.destroy({ where: { id } });
  if (deletedPermission === 0) {
    return next(new ApiError("permission is not found", 404));
  }
  res.status(200).json({ status: "success", data: null });
};



module.exports.addUserPermission =async(req,res,next)=>{
const {userId , permissionId}=req.body;
const user=await User.findOne({where:{id:userId}})
if (!user) {
  return next(new ApiError('user not found',404))
}
const permission =await Permissions.findOne({where:{id:permissionId}})

if (!permission) {
  return next(new ApiError('permission not found',404))
}
const userPermission=await user.addPermission(permission);

res.status(200).json({status:"success",data:{userPermission}})
}


// module.exports.getAllUserPermissions= async(req,res,next)=>{

// const userPermissions =await userPermissions.findAll({})

// res.status(200).json({status:"success",data:{userPermissions}})

// }