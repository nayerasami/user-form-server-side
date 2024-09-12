const express= require('express')
const asyncHandler =require('express-async-handler')
const { createExperience, updateExperience,getOneExperience, deleteExperience, getAllExperience } = require('../controllers/experience.controller')
const experienceRouter =express.Router()



experienceRouter.route('/')
.get(asyncHandler(getAllExperience))
.post(asyncHandler(createExperience))


experienceRouter.route('/:userId/:id')
.get(asyncHandler(getOneExperience))
.put(asyncHandler(updateExperience))
.delete(asyncHandler(deleteExperience))

module.exports =experienceRouter