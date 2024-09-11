const User =require('./user.model');
const Experience =require('./experience.model');
const Permissions =require('./permissions.model');
const Countries =require('./countries.model');


User.hasMany(Experience)
Experience.belongsTo(User)


Countries.hasMany(User)
User.belongsTo(Countries)

User.belongsToMany(Permissions,{
    through:'user_permissions'
})
Permissions,belongsToMany(User,{
     through:'user_permissions'
})