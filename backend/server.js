const { json } = require('express')

const app = require('express')()

//cors
var cors = require('cors')
app.use(cors())

//env
require('dotenv').config()

//DB
const { connect } = require('./config/db')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

//middlewares
app.use(json())

//Routes imports
const { userRoute } = require('./routes/user.route')
const { chatRoute } = require('./routes/chat.route')
const { messageRoute } = require('./routes/message.route')



//All routes
app.use('/api/user' , userRoute)
app.use('/api/chat' , chatRoute)
app.use('/api/message' , messageRoute)


app.get('/',(req,res)=>{
    res.send("Welcome to chattyapp API")
})

app.use(notFound)
app.use(errorHandler)

const server = app.listen(process.env.PORT , async()=>{
    console.log("App is Listening at " , process.env.PORT)
    await connect
    console.log("Connected to DB")
})

const io = require('socket.io')(server , {
    cors:{
        origin: '*'
    }
 })

io.on('connection' , (socket)=>{
    console.log("connected to socket.io")


    socket.on('setup' , (userData)=>{
        socket.join(userData._id)
        socket.emit("Connected")
    })

    socket.on('join-chat' , (room)=>{
        socket.join(room)
        console.log('user join ' + room)
    })

    socket.on('typing' , (room)=>socket.in(room).emit('typing'))

    socket.on('stop-typing' , (room)=>socket.in(room).emit('stop-typing'))


    socket.on('new-message' , (newRecevedMessage)=>{

        var chat = newRecevedMessage.chat

        if(!chat.users) return console.log("Not user");

        chat.users.forEach((user)=>{
            if(user._id == newRecevedMessage.sender._id) return

            socket.in(user._id).emit('message-receved' , newRecevedMessage)
        })
    })

})