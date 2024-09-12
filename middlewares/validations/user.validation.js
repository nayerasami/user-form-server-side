const joi =require('joi')


const gender = ['Male', 'Female'];
const maritalStatus =["Single", "Divorced", "Married", "Widower"]


module.exports.validateAddUser = joi.object({

      firstNameAR:joi.string().required().min(2).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
      lastNameAR:joi.string().required().min(2).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
      firstNameEN:joi.string().required().min(2).pattern(/^[a-zA-Z\s]+$/i).trim(),
      lastNameEN:joi.string().required().min(2).pattern(/^[a-zA-Z\s]+$/i).trim(),
      email:joi.string().email().required().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i).trim(),
      phoneKey: joi.number().integer().positive().required(),
      phoneNumber:joi.string().required().min(2).pattern(/^[0-9]+$/i).trim(),
      nationalID:joi.string().required().min(2).trim(),
      birthDate:joi.date().required().custom((value,helpers)=>{
        const currentDate =new Date();
        if(value >= currentDate){
            return helpers.message("Birth date must be in the past")
        }
        return value;
      }),
      addressAr:joi.string().required().min(8).max(150).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
      addressEN:joi.string().required().min(8).max(150).pattern(/^[a-zA-Z\s]+$/i).trim(),
      gender: joi.string().valid(...gender).required().min(2).trim(),
      maritalStatus: joi.string().valid(...maritalStatus).required().min(2).trim()

})


module.exports.validateEditUser =joi.object({

    id: joi.number().integer().positive().required(),
    firstNameAR:joi.string().optional().min(2).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
    lastNameAR:joi.string().optional().min(2).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
    firstNameEN:joi.string().optional().min(2).pattern(/^[a-zA-Z\s]+$/i).trim(),
    lastNameEN:joi.string().optional().min(2).pattern(/^[a-zA-Z\s]+$/i).trim(),
    email:joi.string().email().optional().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i).trim(),
    phoneKey: joi.number().integer().positive().optional(),
    phoneNumber:joi.string().optional().min(2).pattern(/^[0-9]+$/i).trim(),
    nationalID:joi.string().optional().min(2).trim(),
    birthDate:joi.date().optional().custom((value,helpers)=>{
      const currentDate =new Date();
      if(value >= currentDate){
          return helpers.message("Birth date must be in the past")
      }
      return value;
    }),
    addressAr:joi.string().optional().min(8).max(150).pattern(/^[\u0600-\u06FF\s]+$/u).trim(),
    addressEN:joi.string().optional().min(8).max(150).pattern(/^[a-zA-Z\s]+$/i).trim(),
    gender: joi.string().valid(...gender).optional().min(2).trim(),
    maritalStatus: joi.string().valid(...maritalStatus).optional().min(2).trim()

    
})

