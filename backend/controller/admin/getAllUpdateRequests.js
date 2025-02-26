const updateRequestModel = require("../../models/updateRequestModel");
const assignDeveloperPermission = require("../../helpers/permission");

async function getAllUpdateRequests(req, res) {
    try {
      const sessionUserId = req.userId;
      
      // Check if user has permission
      if (!assignDeveloperPermission(sessionUserId)) {
        throw new Error("Permission denied");
      }
      
      const updateRequests = await updateRequestModel.find()
        .populate('userId', 'name email')
        .populate({
          path: 'updatePlanId',
          populate: {
            path: 'productId',
            select: 'serviceName validityPeriod updateCount'
          }
        })
        .populate('assignedDeveloper', 'name email department')
        .sort({ createdAt: -1 });
      
      return res.status(200).json({
        message: "Update requests retrieved successfully",
        error: false,
        success: true,
        data: updateRequests
      });
    } catch (error) {
      console.error('Error fetching all update requests:', error);
      return res.status(400).json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
  }

module.exports = getAllUpdateRequests