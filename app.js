const express =require('express')
const dotenv =require('dotenv')
dotenv.config()
const app =express()
// const bootstrap =require('./routes/index.routes')


// bootstrap(app,express);





const port =process.env.PORT || 3000
app.listen( port,()=>{
    console.log(`app is listening on port ${port}`)
})