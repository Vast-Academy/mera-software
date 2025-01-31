const userModel = require("../../models/userModel")

const deductWalletController = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            throw new Error("Please provide amount");
        }

        const user = await userModel.findById(req.userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Check if user has sufficient balance
        if (user.walletBalance < amount) {
            throw new Error("Insufficient wallet balance");
        }

        // Deduct amount
        user.walletBalance -= Number(amount);
        await user.save();

        res.status(200).json({
            message: "Payment successful",
            data: {
                remainingBalance: user.walletBalance
            },
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deductWalletController;