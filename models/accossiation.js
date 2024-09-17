const User =require('./user.model');
const Experience =require('./experience.model');
const Permissions =require('./permissions.model');
const Countries =require('./countries.model');
//const userPermissions = require('./user_permissions');


User.hasMany(Experience,{foreignKey:'user_id'})
Experience.belongsTo(User,{foreignKey:'user_id'})


Countries.hasMany(User,{ foreignKey: 'phoneKey' })
User.belongsTo(Countries,{ foreignKey: 'phoneKey' })

User.belongsToMany(Permissions,{
    through:'user_permissions'
})
Permissions.belongsToMany(User,{
     through:'user_permissions'
})


module.exports = { User, Experience, Permissions, Countries };
