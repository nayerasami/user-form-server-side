const express =require('express');
const asyncHandler =require('express-async-handler');
const { getAllPermissions, createNewPermission, getOnePermission ,updatePermission ,deletePermission } = require('../controllers/permissions.controller');
//const { updateExperience, deleteExperience } = require('../controllers/experience.controller');


const permissionsRouter =express.Router()

permissionsRouter.route('/')
.get(asyncHandler(getAllPermissions))
.post(asyncHandler(createNewPermission))

permissionsRouter.route('/:id')
.get(asyncHandler(getOnePermission))
.put(asyncHandler(updatePermission))
.delete(asyncHandler(deletePermission))


module.exports=permissionsRouter