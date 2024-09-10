const express =require('express')
const dotenv =require('dotenv')
const bootstrap =require('./routes/index.route')


dotenv.config()
const app =express()


bootstrap(app,express);





const port =process.env.PORT || 3000
app.listen( port,()=>{
    console.log(`app is listening on port ${port}`)
})