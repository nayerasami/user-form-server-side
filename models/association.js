const User =require('./user.model');
const Experience =require('./experience.model');
const Permissions =require('./permissions.model');
const Countries =require('./countries.model');
const userPermissions = require('./user_permissions');
const Attachment = require('./attachment');
//const userPermissions = require('./user_permissions');


User.hasMany(Experience,{foreignKey:'user_id', as: 'userExperience', onDelete: 'CASCADE' })
Experience.belongsTo(User,{foreignKey:'user_id'})


Countries.hasMany(User,{ foreignKey: 'phoneKey' })
User.belongsTo(Countries,{ foreignKey: 'phoneKey' })

User.belongsToMany(Permissions,{
    through: userPermissions
})
Permissions.belongsToMany(User,{
through: userPermissions
})
User.hasMany(userPermissions)
userPermissions.belongsTo(User)

Permissions.hasMany(userPermissions)
userPermissions.belongsTo(Permissions)

User.hasMany(Attachment ,{
    foreignKey :'attachable_id',
    scope: {
        attachable_type: "userPic",
      }
})

Countries.hasMany(Attachment ,{
    foreignKey:'attachable_id',
    scope:{
        attachable_type:"countryFlag"
    }
})

module.exports = { User, userPermissions,Experience, Permissions, Countries ,Attachment};
