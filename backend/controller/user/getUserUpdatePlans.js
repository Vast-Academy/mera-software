const orderModel = require("../../models/orderProductModel");

  async function getUserUpdatePlans(req, res) {
    try {
      const userId = req.userId;
      
      // Find all update plans owned by the user
      const userUpdatePlans = await orderModel.find({
        userId,
        isActive: true,
        'productId.isWebsiteUpdate': true
      }).populate('productId', 'serviceName validityPeriod updateCount')
      .sort({ createdAt: -1 });
      
      return res.status(200).json({
        message: "Update plans retrieved successfully",
        error: false,
        success: true,
        data: userUpdatePlans
      });
    } catch (error) {
      console.error('Error fetching user update plans:', error);
      return res.status(400).json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
  }

module.exports = getUserUpdatePlans