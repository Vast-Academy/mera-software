const userModel = require("../../models/userModel")

async function userDetailsController (req,res) {
    try {
        console.log("userId", req.userId);
        const user = await userModel.findById(req.userId)

        if (!user) {
            throw new Error("User not found");
        }

        res.status(200).json({
            data: {
                ...user._doc,
                walletBalance: user.walletBalance  // Explicitly include wallet balance
            },
            error : false,
            success: true,
            message: "User Details"
        })

        console.log("user", user);
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController