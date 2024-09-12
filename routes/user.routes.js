const express = require("express");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
 const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require("../controllers/user.controller");
 const {validation }=require('../middlewares/validations/validation');
const { validateAddUser, validateEditUser } = require("../middlewares/validations/user.validation");

userRouter.route("/")
.get(asyncHandler(getAllUsers))
.post(validation(validateAddUser),asyncHandler(createUser));

userRouter.route("/:id")
.get(asyncHandler(getOneUser))
.put(validation(validateEditUser),asyncHandler(updateUser))
.delete(asyncHandler(deleteUser));

module.exports = userRouter;
