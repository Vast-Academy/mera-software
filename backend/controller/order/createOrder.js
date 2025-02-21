const orderProductModel = require("../../models/orderProductModel")
const productModel =  require("../../models/productModel")

const createOrder = async (req, res) => {
     try {
        const { productId, quantity, price } = req.body;
        const userId = req.userId;

        // Fetch product details
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if it's a website service
        const isWebsiteService = ['standard_websites', 'dynamic_websites']
            .includes(product.category);
            const isWebsiteUpdate = product.category === 'website_updates';

        let orderData = {
            userId,
            productId,
            quantity,
            price,
            isWebsiteProject: isWebsiteService,
            isActive: isWebsiteUpdate 
        };

        // If it's a website service, add checkpoints
        if (isWebsiteService) {
            // Fixed checkpoints
            const structureCheckpoints = [
                { checkpointId: 1, name: "Website Structure ready", percentage: 2, completed: false },
                { checkpointId: 2, name: "Header created", percentage: 5, completed: false },
                { checkpointId: 3, name: "Footer created", percentage: 5, completed: false },
            ];

            // Calculate percentage for pages
            const remainingPercentage = 78;
            const percentagePerPage = Number((remainingPercentage / product.totalPages).toFixed(2));

            // Generate page checkpoints
            const pageCheckpoints = Array.from(
                { length: product.totalPages },
                (_, index) => ({
                    checkpointId: index + 4,
                    name: index < 4 ? 
                        ["Home Page", "About Us Page", "Contact Us Page", "Gallery Page"][index] :
                        `Additional Page ${index - 3}`,
                    percentage: percentagePerPage,
                    completed: false
                })
            );

            // Final testing checkpoint
            const finalCheckpoint = [
                { 
                    checkpointId: product.totalPages + 4,
                    name: "Final Testing",
                    percentage: 10,
                    completed: false
                }
            ];

            orderData.checkpoints = [
                ...structureCheckpoints,
                ...pageCheckpoints,
                ...finalCheckpoint
            ];
            orderData.projectProgress = 0;
            orderData.messages = [];
        }

        if (isWebsiteUpdate) {
            orderData.updatesUsed = 0;
            orderData.isActive = true;
        }

        const order = new orderProductModel(orderData);
        await order.save();

        // Fetch the saved order with populated fields
        const populatedOrder = await orderProductModel.findById(order._id)
            .populate('userId', 'name email')
            .populate('productId',
                 'serviceName category totalPages validityPeriod updateCount isWebsiteUpdate');

        res.status(201).json({
            message: "Order created successfully",
            success: true,
            data: populatedOrder
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

module.exports = createOrder
