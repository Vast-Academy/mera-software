const orderProductModel = require("../../models/orderProductModel")

const getUserOrders = async (req, res) => {
    try {
        // Get the current user's ID from req.userId (which should be set by your auth middleware)
        const userId = req.userId;
        
        // Add userId filter to only get orders for the current user
        const orders = await orderProductModel.find({ userId })
            .populate('userId', 'name email')
            .populate('productId', 'serviceName category totalPages')
            .sort({ createdAt: -1 });

        console.log('Total projects found:', orders.length);
        console.log('Sample project:', orders[0]);
        
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = getUserOrders