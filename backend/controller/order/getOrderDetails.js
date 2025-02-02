const orderProductModel = require("../../models/orderProductModel")

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user._id;

        const order = await orderProductModel.findOne({ _id: orderId, userId })
            .populate({
                path: 'productId',
                select: 'serviceName category sellingPrice serviceImage description'
            });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order details error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch order details'
        });
    }
};

module.exports = getOrderDetails