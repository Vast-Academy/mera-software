const updateRequestModel = require("../../models/updateRequestModel");
const developerModel = require("../../models/developerModel");
const assignDeveloperPermission = require("../../helpers/permission");

async function assignUpdateRequestDeveloper(req, res) {
    try {
      const sessionUserId = req.userId;
      
      // Check if user has permission
      if (!assignDeveloperPermission(sessionUserId)) {
        throw new Error("Permission denied");
      }
      
      const { requestId, developerId } = req.body;
      
      if (!requestId || !developerId) {
        throw new Error("Request ID and Developer ID are required");
      }
      
      // Find the update request
      const updateRequest = await updateRequestModel.findById(requestId);
      if (!updateRequest) {
        throw new Error("Update request not found");
      }
      
      // Check if already assigned
      if (updateRequest.assignedDeveloper) {
        throw new Error("This request is already assigned to a developer");
      }
      
      // Find the developer
      const developer = await developerModel.findById(developerId);
      if (!developer) {
        throw new Error("Developer not found");
      }
      
      // Check developer capacity
      const developerAvailability = await developer.checkAvailability();
      if (!developerAvailability.updateCapacity) {
        throw new Error("Developer has reached maximum update capacity");
      }
      
      // Assign developer to update request
      updateRequest.assignedDeveloper = developerId;
      updateRequest.status = 'in_progress';
      updateRequest.assignedAt = new Date();
      await updateRequest.save();
      
      // Assign update to developer
      await developer.assignUpdateTask(updateRequest.updatePlanId, updateRequest.userId);
      
      // Add notification for developer
      developer.notifications.push({
        message: `New website update request assigned to you`,
        type: 'Update',
        createdAt: new Date()
      });
      await developer.save();
      
      return res.status(200).json({
        message: "Developer assigned successfully",
        error: false,
        success: true,
        data: {
          developer: {
            _id: developer._id,
            name: developer.name,
            email: developer.email,
            department: developer.department
          }
        }
      });
    } catch (error) {
      console.error('Error assigning developer:', error);
      return res.status(400).json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
  }

module.exports = assignUpdateRequestDeveloper  