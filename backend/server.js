const app = require('express')()

//env
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send("Welcome to chattyapp API")
})

app.listen(process.env.PORT , ()=>{
    console.log("App is Listening at " , process.env.PORT)
})