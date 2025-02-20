const Order = require("../../models/orderProductModel");
const Transaction = require("../../models/transactionModel");

const getWalletHistoryController = async (req, res) => {
    try {
        // Get order-related transactions (payments)
        const orders = await Order.find({ userId: req.userId })
            .populate('productId', 'serviceName category')
            .sort({ createdAt: -1 });

        const orderTransactions = orders.map(order => ({
            id: order._id,
            amount: -(order.price * order.quantity),
            type: 'payment',
            productId: {
                serviceName: order.productId?.serviceName,
            },
            date: order.createdAt,
            quantity: order.quantity
        }));

        // Get refund and deposit transactions
        const walletTransactions = await Transaction.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        const otherTransactions = walletTransactions.map(transaction => ({
            id: transaction._id,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description,
            relatedOrderId: transaction.relatedOrderId,
            date: transaction.createdAt
        }));

        // Combine and sort all transactions by date
        const combinedHistory = [...orderTransactions, ...otherTransactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({
            message: "Wallet history fetched successfully",
            data: combinedHistory,
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

module.exports = getWalletHistoryController;