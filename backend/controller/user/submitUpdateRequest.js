const updateRequestModel = require("../../models/updateRequestModel");
const orderModel = require("../../models/orderProductModel");
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Utility function to ensure directory exists
const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)){
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

async function submitUpdateRequest(req, res) {
  try {
    const userId = req.userId;
    const { planId } = req.body;
    let instructions = [];
    
    // Parse instructions if provided
    if (req.body.instructions) {
      try {
        instructions = JSON.parse(req.body.instructions);
      } catch (e) {
        console.error('Error parsing instructions:', e);
      }
    }
    
    // Validate the update plan exists and belongs to the user
    const updatePlan = await orderModel.findOne({
      _id: planId,
      userId,
      isActive: true
    }).populate('productId');
    
    if (!updatePlan) {
      throw new Error('Update plan not found or not active');
    }
    
    // Check if the user has updates remaining
    if (updatePlan.updatesUsed >= updatePlan.productId.updateCount) {
      throw new Error('No updates remaining in this plan');
    }
    
    // Check if the plan is still valid
    const validityInDays = updatePlan.productId.validityPeriod;
    const startDate = new Date(updatePlan.createdAt);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + validityInDays);
    
    if (new Date() > endDate) {
      throw new Error('Update plan has expired');
    }
    
    // Process files if any
    const uploadDir = path.join(__dirname, '../../uploads/updates', userId.toString(), planId.toString());
    ensureDirectoryExists(uploadDir);
    
    // Function to process a file and return a document-ready object
    const processFile = async (file) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const isImage = ['.jpg', '.jpeg'].includes(fileExtension);
      
      if (isImage) {
        // For images, create a compressed version
        const originalPath = file.path;
        const compressedFilename = `compressed_${file.filename}`;
        const compressedPath = path.join(path.dirname(file.path), compressedFilename);
        
        // Compress image using sharp
        await sharp(originalPath)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(compressedPath);
          
        // Delete the original file
        fs.unlinkSync(originalPath);
        
        // Return a plain object with the file data
        return {
          filename: compressedFilename,
          originalName: file.originalname,
          path: `/uploads/updates/${userId}/${planId}/${compressedFilename}`,
          type: file.mimetype,
          size: fs.statSync(compressedPath).size
        };
      } else {
        // For non-image files
        return {
          filename: file.filename,
          originalName: file.originalname,
          path: `/uploads/updates/${userId}/${planId}/${file.filename}`,
          type: file.mimetype,
          size: file.size
        };
      }
    };
    
    // Process each file individually and collect raw data objects
    const fileObjects = [];
    if (req.files && req.files.length > 0) {
      console.log("Files received:", req.files.length);
      
      for (const file of req.files) {
        try {
          const processedFile = await processFile(file);
          fileObjects.push(processedFile);
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }
    }
    
    console.log("Processed files:", fileObjects);
    
    // Create document using direct MongoDB operations to bypass Mongoose validation
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Create the update request as a raw MongoDB document
      const updateRequestData = {
        userId: new ObjectId(userId),
        updatePlanId: new ObjectId(planId),
        instructions: instructions.map(msg => ({
          text: msg.text,
          timestamp: new Date(msg.timestamp)
        })),
        files: fileObjects,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Insert directly using the model's collection
      const result = await updateRequestModel.collection.insertOne(updateRequestData);
      
      // Update the plan's usedUpdates count
      await orderModel.updateOne(
        { _id: new ObjectId(planId) },
        { $inc: { updatesUsed: 1 } }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      return res.status(200).json({
        message: "Update request submitted successfully",
        error: false,
        success: true,
        data: {
          requestId: result.insertedId,
          updatesRemaining: updatePlan.productId.updateCount - (updatePlan.updatesUsed + 1)
        }
      });
    } catch (transactionError) {
      await session.abortTransaction();
      session.endSession();
      throw transactionError;
    }
  } catch (error) {
    console.error('Error submitting update request:', error);
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = submitUpdateRequest