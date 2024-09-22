const express= require('express')
const asyncHandler =require('express-async-handler')
const { createExperience, updateExperience,getOneExperience, deleteExperience, getAllExperience } = require('../controllers/experience.controller')
const experienceRouter =express.Router()
const {validation }=require('../middlewares/validations/validation')
const { validateAddExperience, validateEditExperience } = require('../middlewares/validations/experience.validation')


experienceRouter.route('/')
.get(asyncHandler(getAllExperience))
.post(asyncHandler(createExperience))


experienceRouter.route('/:id/:userId')
.get(asyncHandler(getOneExperience))
.put(asyncHandler(updateExperience))
.delete(asyncHandler(deleteExperience))

module.exports =experienceRouter