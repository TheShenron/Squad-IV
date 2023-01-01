const { Router } = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController')
const { protect } = require('../middlewares/authMiddleware')
const chatRoute = Router()

chatRoute.post('/' , protect , accessChat)
chatRoute.get('/' , protect , fetchChats)
chatRoute.post('/group' , protect , createGroupChat)
chatRoute.put('/rename' , protect , renameGroup)
chatRoute.put('/groupadd' , protect , addToGroup)
chatRoute.put('/groupremove' , protect , removeFromGroup)

module.exports = { chatRoute }