const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');
// const { generateOTP, saveOTP, sendOTPEmail } = require('../../helpers/otpUtils'); 

async function userSignInController (req,res) {
    try {
        
        const { email, password, role } = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!role){
            throw new Error("Please provide role")
        }

        const user = await userModel.findOne({email}).select('email password name roles walletBalance userDetails');

        if(!user){
            throw new new Error("User not found")
        }

        // Check if user has the requested role
        if(!user.roles.includes(role.toLowerCase())){
            throw new Error("User does not have the requested role")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        
        console.log("checkPassword",checkPassword);

        if(checkPassword) {
            // OTP bypass: Direct login flow
            const tokenData = {
                _id: user._id,
                email: user.email,
                role: role.toLowerCase()
            };
            console.log("🛑 Token payload before signing:", tokenData);

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '365d' });
            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 365 * 24 * 60 * 60 * 1000
            };
            
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login Successfully",
                data: {
                    token,
                    user: {
                        ...user._doc,
                        password: undefined,
                    role: role.toLowerCase()
                    },
                    walletBalance: user.walletBalance,
                    isDetailsCompleted: user.userDetails?.isDetailsCompleted || false,
                },
                success: true,
                error: false,
                requireOtp: false // Ab ye hamesha false rahega
            });
        } else {
            throw new Error("Please check password");
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;