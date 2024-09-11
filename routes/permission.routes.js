const express =require('express');
const asyncHandler =require('express-async-handler');
const { getAllPermissions, createNewPermission, getPermissionByPK } = require('../controllers/permissions.controller');
const { updateExperience, deleteExperience } = require('../controllers/experience.controller');


const permissionsRouter =express.Router()

permissionsRouter.route('/')
.get(asyncHandler(getAllPermissions))
.post(asyncHandler(createNewPermission))

permissionsRouter.route('/:id')
.get(asyncHandler(getPermissionByPK))
.put(asyncHandler(updateExperience))
.delete(asyncHandler(deleteExperience))


module.exports=permissionsRouter