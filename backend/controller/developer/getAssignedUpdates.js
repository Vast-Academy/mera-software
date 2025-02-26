const updateRequestModel = require("../../models/updateRequestModel");
const developerModel = require("../../models/developerModel");

async function getAssignedUpdates(req, res) {
  try {
    const developerId = req.userId;
    
    // Verify developer exists
    const developer = await developerModel.findById(developerId);
    if (!developer) {
      throw new Error("Developer not found");
    }
    
    // Find all update requests assigned to this developer
    const assignedUpdates = await updateRequestModel.find({
      assignedDeveloper: developerId
    })
    .populate('userId', 'name email')
    .populate({
      path: 'updatePlanId',
      populate: {
        path: 'productId',
        select: 'serviceName validityPeriod updateCount'
      }
    })
    .sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: "Assigned updates retrieved successfully",
      error: false,
      success: true,
      data: assignedUpdates
    });
  } catch (error) {
    console.error('Error fetching assigned updates:', error);
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = getAssignedUpdates