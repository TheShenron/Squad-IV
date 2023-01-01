const asyncHandler = require('express-async-handler')
const { chatModel } = require('../models/chat.model')
const { messageModel } = require('../models/massage.model')
const { userModel } = require('../models/user.model')

const sendMassage = asyncHandler(async(req,res , next)=>{
    const {content , chatId } = req.body

    if(!content || !chatId) {
        console.log('Invalid Data pass')
        return res.send(400)
    }

    var newMessage = {
        sender: req.user._id,
        content:content,
        chat: chatId
    }

    try {

        let message = await messageModel.create(newMessage)

        message = await message.populate('sender' , 'name pic')
        message = await message.populate('chat')
        message = await userModel.populate(message , {
            path: 'chat.users',
            select:"name pic email"
        })

        await chatModel.findByIdAndUpdate(chatId , {
            latestMassage:message
        })

        res.json(message)
        
    } catch (error) {
        res.status(400)
        throw new Error('error while adding message..')
    }
})


const allMessage = asyncHandler(async (req,res)=>{
    try {
        let message = await messageModel.find({chat:req.params.chatId})
        .populate('sender' , 'name pic email')
        .populate('chat')

        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error('error while getting all message..')
    }
})

module.exports = { sendMassage , allMessage}