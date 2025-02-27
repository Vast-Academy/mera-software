const updateRequestModel = require("../../models/updateRequestModel");
const orderModel = require("../../models/orderProductModel");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// एरर हैंडलिंग वरैपर
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error('Error in async handler:', err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
      error: true,
      success: false
    });
  });
};

const submitUpdateRequest = asyncHandler(async (req, res) => {
  console.log("Request body keys:", Object.keys(req.body));
  console.log("Files received:", req.files ? req.files.length : 'No files');
  
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
      error: true,
      success: false
    });
  }
  
  const { planId } = req.body;
  if (!planId) {
    return res.status(400).json({
      message: "Plan ID is required",
      error: true,
      success: false
    });
  }
  
  let instructions = [];
  
  // Parse instructions if provided
  if (req.body.instructions) {
    try {
      instructions = JSON.parse(req.body.instructions);
      console.log("Parsed instructions count:", instructions.length);
    } catch (e) {
      console.error('Error parsing instructions:', e);
      return res.status(400).json({
        message: "Invalid instructions format",
        error: true,
        success: false
      });
    }
  }
  
  // Validate the update plan exists and belongs to the user
  const updatePlan = await orderModel.findOne({
    _id: planId,
    userId,
    isActive: true
  }).populate('productId');
  
  if (!updatePlan) {
    return res.status(404).json({
      message: 'Update plan not found or not active',
      error: true,
      success: false
    });
  }
  
  // Check if the user has updates remaining
  if (updatePlan.updatesUsed >= updatePlan.productId.updateCount) {
    return res.status(400).json({
      message: 'No updates remaining in this plan',
      error: true,
      success: false
    });
  }
  
  // Check if the plan is still valid
  const validityInDays = updatePlan.productId.validityPeriod;
  const startDate = new Date(updatePlan.createdAt);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + validityInDays);
  
  if (new Date() > endDate) {
    return res.status(400).json({
      message: 'Update plan has expired',
      error: true,
      success: false
    });
  }
  
  // मेमोरी में स्टोर की गई फाइलों को संभालें
  const fileObjects = [];
  if (req.files && req.files.length > 0) {
    console.log("File properties:", Object.keys(req.files[0]));
  console.log("Has buffer?", !!req.files[0].buffer);
  console.log("Buffer size:", req.files[0].buffer?.length);
    console.log("Processing files in memory...");
    
    for (const file of req.files) {
      try {
        // फाइल को Base64 में कन्वर्ट करें
        const fileContent = file.buffer.toString('base64');
        
        // फाइल के मेटाडेटा एनकोड करें
        fileObjects.push({
          filename: file.originalname.replace(/\s+/g, '_'),
          originalName: file.originalname,
          type: file.mimetype,
          size: file.size,
          content: fileContent // Base64 एनकोडेड कंटेंट
        });
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  }
  
  console.log("Processed files count:", fileObjects.length);
  
  // Create update request document
  try {
    // Create the update request
    const updateRequest = new updateRequestModel({
      userId: new ObjectId(userId),
      updatePlanId: new ObjectId(planId),
      instructions: instructions.map(msg => ({
        text: msg.text,
        timestamp: new Date(msg.timestamp || Date.now())
      })),
      files: fileObjects,
      status: 'pending'
    });
    
    // Save the request
    await updateRequest.save();
    
    // Update the plan's usedUpdates count
    await orderModel.updateOne(
      { _id: new ObjectId(planId) },
      { $inc: { updatesUsed: 1 } }
    );
    
    return res.status(200).json({
      message: "Update request submitted successfully",
      error: false,
      success: true,
      data: {
        requestId: updateRequest._id,
        updatesRemaining: updatePlan.productId.updateCount - (updatePlan.updatesUsed + 1)
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      message: error.message || 'Failed to save update request',
      error: true,
      success: false
    });
  }
});

module.exports = submitUpdateRequest;