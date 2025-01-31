const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required : true
    },
    password: String,
    profilePic : String,
    role : String,
    walletBalance: {
        type: Number,
        default: 0    // हर नए user का initial balance 0 होगा
    }
},{
    timestamps: true
})

const userModel = mongoose.model("user",userSchema)


module.exports = userModel 