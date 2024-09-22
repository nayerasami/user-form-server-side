const joi =require('joi')

module.exports.validateAddExperience=joi.object({
    user_id:joi.number().integer().positive().required(),
    companyName:joi.string().required().trim(),
    startDate:joi.date().required().custom((value,helpers)=>{
        const currentDate =new Date();
        if(value >= currentDate){
            return helpers.message("Start date must be in the past")
        }
        return value;
      }),

      endDate:joi.date().optional().custom((value,helpers,state)=>{
        const currentDate =new Date();
        const { startDate } = state.ancestors[0]; 
        if (value && value >= currentDate) {
          return helpers.message("End date must be in the past");
        }
        if (value && startDate && value <= startDate) {
          return helpers.message("End date must be after start date");
        }
        return value;
      }),
      currentlyWorking :joi.boolean().optional()
})

module.exports.validateEditExperience =joi.object({
    companyName:joi.string().required().trim(),
    startDate:joi.date().required().custom((value,helpers)=>{
        const currentDate =new Date();
        if(value >= currentDate){
            return helpers.message("end date must be in the past")
        }
        return value;
      }),
      endDate:joi.date().optional().custom((value,helpers,state)=>{
        const currentDate =new Date();
        const { startDate } = state.ancestors[0]; 
        if (value && value >= currentDate) {
          return helpers.message("End date must be in the past");
        }
        if (value && startDate && value <= startDate) {
          return helpers.message("End date must be after start date");
        }
        return value;
      }),
      currentlyWorking :joi.boolean().optional()
})
