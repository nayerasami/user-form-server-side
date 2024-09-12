const joi =require('joi')

module.exports.validateAddPermission=joi.object({
    permission:joi.string().required().trim()
})

module.exports.validateEditPermission =joi.object({
    id:joi.number().integer().positive().required(),
    permission:joi.string().optional().trim()

})
