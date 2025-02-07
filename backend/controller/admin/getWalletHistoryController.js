const Order = require("../../models/orderProductModel"); // orderProductModel use करें

const getWalletHistoryController = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })
            .populate('productId', 'serviceName category') // serviceName (not servicetName)
            .sort({ createdAt: -1 });

        const walletHistory = orders.map(order => ({
            _id: order._id,
            amount: order.price * order.quantity,
            productId: {
                serviceName: order.productId?.serviceName, // serviceName से map करें
            },
            date: order.createdAt,
            quantity: order.quantity
        }));

        res.status(200).json({
            message: "Wallet history fetched successfully",
            data: walletHistory,
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error in getWalletHistory:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getWalletHistoryController