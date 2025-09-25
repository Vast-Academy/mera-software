const orderProductModel = require("../../models/orderProductModel")

const getUserOrders = async (req, res) => {
    try {
        // Get the current user's ID from req.userId (which should be set by your auth middleware)
        const userId = req.userId;
        
        // Add userId filter to only get orders for the current user
        const orders = await orderProductModel.find({ userId })
            .populate('userId', 'name email')
            .populate('productId',
                 'serviceName category totalPages validityPeriod updateCount isWebsiteUpdate isMonthlyRenewablePlan yearlyPlanDuration monthlyRenewalCost isUnlimitedUpdates')
            .populate('assignedDeveloper', 'name designation avatar status')
            .sort({ createdAt: -1 });

        console.log('Total projects found:', orders.length);
        console.log('Sample project:', orders[0]);

        // Debug yearly plans
        const yearlyPlans = orders.filter(order => order.productId?.isMonthlyRenewablePlan);
        if (yearlyPlans.length > 0) {
            console.log('Found yearly plans:', yearlyPlans.length);
            console.log('Yearly plan sample:', {
                id: yearlyPlans[0]._id,
                isMonthlyRenewablePlan: yearlyPlans[0].productId?.isMonthlyRenewablePlan,
                yearlyPlanDuration: yearlyPlans[0].productId?.yearlyPlanDuration,
                monthlyRenewalCost: yearlyPlans[0].productId?.monthlyRenewalCost,
                totalYearlyDaysRemaining: yearlyPlans[0].totalYearlyDaysRemaining,
                currentMonthExpiryDate: yearlyPlans[0].currentMonthExpiryDate,
                currentMonthUpdatesUsed: yearlyPlans[0].currentMonthUpdatesUsed
            });
        }
        
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