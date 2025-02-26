const updateRequestModel = require("../../models/updateRequestModel");
const assignDeveloperPermission = require("../../helpers/permission");

async function completeUpdateRequest(req, res) {
    try {
      const sessionUserId = req.userId;
      
      // Check if user has permission
      if (!assignDeveloperPermission(sessionUserId)) {
        throw new Error("Permission denied");
      }
      
      const { requestId } = req.body;
      
      if (!requestId) {
        throw new Error("Request ID is required");
      }
      
      // Find the update request
      const updateRequest = await updateRequestModel.findById(requestId);
      if (!updateRequest) {
        throw new Error("Update request not found");
      }
      
      // Check if already completed
      if (updateRequest.status === 'completed') {
        throw new Error("This request is already completed");
      }
      
      // Update status to completed
      updateRequest.status = 'completed';
      updateRequest.completedAt = new Date();
      await updateRequest.save();
      
      return res.status(200).json({
        message: "Update request marked as completed",
        error: false,
        success: true
      });
    } catch (error) {
      console.error('Error completing request:', error);
      return res.status(400).json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
  }

module.exports = completeUpdateRequest  