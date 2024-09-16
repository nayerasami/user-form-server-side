const express =require('express');
const asyncHandler =require('express-async-handler');
const { getAllPermissions, createNewPermission, getOnePermission ,updatePermission ,deletePermission, addUserPermission } = require('../controllers/permissions.controller');
const {validation }=require('../middlewares/validations/validation');
const { validateAddPermission, validateEditPermission } = require('../middlewares/validations/permissions.validation');


const permissionsRouter =express.Router()

permissionsRouter.route('/user-permission').post(asyncHandler(addUserPermission))

permissionsRouter.route('/')
.get(asyncHandler(getAllPermissions))
.post(validation(validateAddPermission),asyncHandler(createNewPermission))

permissionsRouter.route('/:id')
.get(asyncHandler(getOnePermission))
.put(validation(validateEditPermission),asyncHandler(updatePermission))
.delete(asyncHandler(deletePermission))


module.exports=permissionsRouter