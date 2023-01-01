const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id} , process.env.SECRET , {
        expiresIn:'30d'
    })
}

module.exports = { generateToken }