const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    }
},
    { timestamps: true }
)

const messageModel = mongoose.model('message', messageSchema)

module.exports = { messageModel }