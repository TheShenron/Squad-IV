const { Router } = require('express')
const { protect } = require('../middlewares/authMiddleware')
const messageRoute = Router()
const {sendMassage, allMessage} = require('../controllers/messageController')

messageRoute.post('/' , protect , sendMassage)
messageRoute.get('/:chatId' , protect , allMessage)



module.exports = { messageRoute }