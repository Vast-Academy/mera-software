const orderProductModel = require("../../models/orderProductModel")

const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await orderProductModel.find({ userId })
            .populate({
                path: 'productId',
                select: 'serviceName category sellingPrice serviceImage' 
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch orders'
        });
    }
};

module.exports = getUserOrders