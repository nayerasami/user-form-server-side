const express =require('express')
const dotenv =require('dotenv')
const bootstrap =require('./routes/index.route')
require('./models/user.model')
require('./models/experience.model')
require('./models/countries.model')
require('./models/permissions.model')
require('./models/user_permissions')
require('./models/association');


dotenv.config()
const app =express()


bootstrap(app,express);





const port =process.env.PORT || 3000
app.listen( port,()=>{
    console.log(`app is listening on port ${port}`)
})