const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
        },
    pic: {
        type: String,
        default: "https://aux.iconspalace.com/uploads/1421321576980686818.png"
    }
},
    { timestamps: true }
)


userSchema.methods.matchPassword = async function(enteredPasswprd){
    return await bcrypt.compare(enteredPasswprd , this.password)
}

userSchema.pre('save' , async function (next){
    
    if(!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)

})

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }