const jwt = require('jsonwebtoken')
const { userModel } = require('../models/user.model')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {

    if (req.headers['authorization'] &&
        req.headers.authorization.startsWith("Bearer")) {
           
            try {
                const token = req.headers.authorization.split(" ")[1]

                //decode token id
                const decoded = jwt.verify(token , process.env.SECRET)

                req.user = await userModel.findById(decoded.id).select('-password')

                next()

            } catch (error) {
                res.status(401)
                throw new Error("authorization failed!")
            }
    }else{
        res.status(401)
        throw new Error("Token not present!")
    }

})

module.exports = { protect }