const updateRequestModel = require("../../models/updateRequestModel");
const assignDeveloperPermission = require("../../helpers/permission");

async function getAllUpdateRequests(req, res) {
  try {
    const sessionUserId = req.userId;
   
    // Check if user has permission
    if (!assignDeveloperPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
   
    // Populate the full chain of references
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
    
    // Log a sample request to debug
    if (updateRequests.length > 0) {
      console.log("Sample update request:", {
        id: updateRequests[0]._id,
        userId: updateRequests[0].userId,
        files: updateRequests[0].files,
        filesCount: updateRequests[0].files ? updateRequests[0].files.length : 0
      });
    } else {
      console.log("No update requests found");
    }
   
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

module.exports = getAllUpdateRequests;