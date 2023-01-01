const asyncHandler = require("express-async-handler");
const { chatModel } = require('../models/chat.model');
const { userModel } = require("../models/user.model");


const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        console.log("userId is not present in body")
        return res.sendStatus(400)
    }

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password').populate('latestMassage')

    isChat = await userModel.populate(isChat, {
        path: "latestMassage.sender",
        select: 'name email pic'
    })



    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createChat = await chatModel.create(chatData)

            const FullChat = await chatModel.findOne({ _id: createChat._id }).populate('users', '-password')

            res.send(FullChat)

        } catch (error) {

            res.sendStatus(401)
            throw new Error(error.message)

        }
    }

})


const fetchChats = asyncHandler(async (req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMassage')
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await userModel.populate(result, {
                    path: "latestMassage.sender",
                    select: 'name email pic'
                })

                res.send(result)
            })
    } catch (error) {
        res.sendStatus(401)
        throw new Error(error.message)
    }
})



const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send("fill all the fileds")
    }

    let users = JSON.parse(req.body.users)

    if (users.length < 2) {
        return res.status(400).send("User must me Greater then 2")
    }

    users.push(req.user)

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.name,
            users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const FullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')

        res.send(FullGroupChat)

    } catch (error) {
        res.sendStatus(401)
        throw new Error(error.message)
    }

})



const renameGroup = asyncHandler(async (req, res) => {

    const { chatId, chatName } = req.body

    try {
        const updateChat = await chatModel.findByIdAndUpdate(chatId, {
            chatName,
        },
            { new: true }
        )
            .populate('users', '-password')
            .populate('groupAdmin', '-password')


        if (!updateChat) {
            res.sendStatus(401)
            throw new Error(error.message)
        } else {
            res.send(updateChat)
        }

    } catch (error) {

    }
})



const addToGroup = asyncHandler(async (req, res) => {

    const { chatId, userId } = req.body

    const add = await chatModel.findByIdAndUpdate(chatId, {
        $push: { users: userId }
    },
        { new: true }
    )
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

    if (!add) {
        res.sendStatus(401)
        throw new Error(error.message)
    } else {
        res.send(add)
    }

})



const removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body

    const remove = await chatModel.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
    },
        { new: true }
    )
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

    if (!remove) {
        res.sendStatus(401)
        throw new Error(error.message)
    } else {
        res.send(remove)
    }
})


module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup , removeFromGroup }