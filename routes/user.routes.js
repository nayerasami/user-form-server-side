const express = require("express");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
 const { getAllUsers, createUser, getOneUser, updateUser, deleteUser, CheckEmail, checkPhone, checkNationalID } = require("../controllers/user.controller");
 const {validation }=require('../middlewares/validations/validation');
const { validateAddUser, validateEditUser } = require("../middlewares/validations/user.validation");



userRouter.route('/check-email').get(asyncHandler(CheckEmail))
userRouter.route('/check-phone').get( asyncHandler(checkPhone))
userRouter.route('/check-national-id').get(asyncHandler(checkNationalID))

userRouter.route("/")
.get(asyncHandler(getAllUsers))
.post(asyncHandler(createUser));

userRouter.route("/:id")
.get(asyncHandler(getOneUser))
.put(asyncHandler(updateUser))
.delete(asyncHandler(deleteUser));




module.exports = userRouter;
