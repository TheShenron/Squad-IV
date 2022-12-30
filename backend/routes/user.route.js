const { Router } = require('express')
const { registerUser, authUser, getAllUser } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

const userRoute = Router()


userRoute.get('/' , protect , getAllUser)
userRoute.post('/register' , registerUser)
userRoute.post('/login' , authUser)


module.exports = { userRoute }
