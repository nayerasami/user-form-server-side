const User =require('./user.model');
const Experience =require('./experience.model');
const Permissions =require('./permissions.model');
const Countries =require('./countries.model');
const userPermissions = require('./user_permissions');
//const userPermissions = require('./user_permissions');


User.hasMany(Experience,{foreignKey:'user_id', as: 'userExperience'})
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

module.exports = { User, userPermissions,Experience, Permissions, Countries };
