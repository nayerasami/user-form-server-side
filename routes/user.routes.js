const express = require("express");
const userRouter = express.Router();
const asyncHandler = require("express-async-handler");
const { getAllUsers, createUser, getUserByPK, updateUser, deleteUser } = require("../controllers/user.controller");

userRouter.route("/")
.get(asyncHandler(getAllUsers))
.post(asyncHandler(createUser));

userRouter.route("/:id")
.get(asyncHandler(getUserByPK))
.put(asyncHandler(updateUser))
.delete(asyncHandler(deleteUser));

module.exports = userRouter;
