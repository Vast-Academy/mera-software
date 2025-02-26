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
   
    // प्रोजेक्ट कंट्रोलर की तरह सिंपल चेक करें
    // - working hours चेक न करें
    // - checkAvailability() मेथड न कॉल करें
    const activeUpdates = developer.currentUpdates ? developer.currentUpdates.length : 0;
    const maxUpdates = developer.workload ? developer.workload.maxUpdatesPerDay : 2;
    
    if (activeUpdates >= maxUpdates) {
      throw new Error("Developer has reached maximum updates capacity");
    }
   
    // Assign developer to update request
    updateRequest.assignedDeveloper = developerId;
    updateRequest.status = 'in_progress';
    updateRequest.assignedAt = new Date();
    await updateRequest.save();
   
    // मैन्युअली अपडेट करें - assignUpdateTask मेथड का उपयोग न करें
    if (!developer.currentUpdates) {
      developer.currentUpdates = [];
    }
    
    developer.currentUpdates.push({
      updatePlan: updateRequest.updatePlanId,
      clientId: updateRequest.userId,
      startDate: new Date(),
      nextUpdateDue: new Date(Date.now() + 24 * 60 * 60 * 1000) // Next day
    });
    
    // Add notification for developer
    if (!developer.notifications) {
      developer.notifications = [];
    }
    
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

module.exports = assignUpdateRequestDeveloper;