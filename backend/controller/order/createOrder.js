const orderProductModel = require("../../models/orderProductModel")

const createOrder = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        const userId = req.userId; // From auth middleware

        const order = new orderProductModel({
            userId,
            productId,
            quantity,
            price,
            status: 'pending'
        });

        await order.save();

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
};

module.exports = createOrder
