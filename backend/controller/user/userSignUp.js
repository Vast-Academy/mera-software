const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController (req,res) {
    try {
        const { email, password, name } = req.body

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Please provide valid email address");
        }
        
        const user = await userModel.findOne({email})
        if(user){
            throw new Error("Already user exist.")
        }

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        // Password validation
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is Wrong")
        }

        const payload = {
            email,
            name,
            password: hashPassword,
            role: "GENERAL",
            walletBalance: 0
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Created Successfully!"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })  
    }
}


module.exports = userSignUpController