const orderProductModel = require("../../models/orderProductModel")

const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;  // Changed from req.body to req.params
        const userId = req.userId;

        const order = await orderProductModel.findOne({ _id: orderId, userId })
            .populate({
                path: 'productId',
                select: 'serviceName category sellingPrice serviceImage description validityPeriod updateCount isWebsiteUpdate'
            })
            .populate({
                path: 'assignedDeveloper',
                select: 'name email phone designation department avatar status' // जरूरी फील्ड्स सिलेक्ट करें
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

module.exports = getOrderDetails;