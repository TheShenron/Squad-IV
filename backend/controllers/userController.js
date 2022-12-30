const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/generateToken');
const { userModel } = require('../models/user.model')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body

    //if anyone is undefined throw new error
    if (!name || !email || !password) {
        res.status(201);
        throw new Error("Please fill all the fields!")
    }

    //check user is already present or not
    const userExists = await userModel.findOne({ email })
    if (userExists) {
        throw new Error('User Already Exist')
    }

    const user = await userModel.create({
        name,
        email,
        password,
        pic
    })

    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Fail to Create User')
    }

})



const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //finding user in db
    const user = await userModel.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found or Password is Incorrect')
    }
})


//get all user
const getAllUser = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {}
    const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } })
    res.send(users)

})


module.exports = { registerUser, authUser, getAllUser }