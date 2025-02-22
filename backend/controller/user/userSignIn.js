const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken')

async function userSignInController (req,res) {
    try {
        
        const { email, password } = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({email}).select('email password name role walletBalance');

        if(!user){
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        
        console.log("checkPassword",checkPassword);

        if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
            role: user.role
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '365d' })

        const tokenOption = {
            httpOnly: true,
            secure : true,
            sameSite : 'None',
            maxAge: 365 * 24 * 60 * 60 * 1000
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message: "Login Successfully",
            data: {
                token,
                user: {
            ...user._doc,
            password: undefined
        },
        walletBalance: user.walletBalance 
            },
            success : true,
            error : false
        })
       
    }else{
        throw new Error("Please check password")
    }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })    
    }
}

module.exports = userSignInController