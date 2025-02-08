const mongoose = require('mongoose');

// Checkpoint Schema
const checkpointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

const productSchema = new mongoose.Schema({
    serviceName: String,
    category: String,
    packageIncludes: [String],
    perfectFor: [String],
    serviceImage: [],
    price: Number,
    sellingPrice: Number,
    description: String,
    websiteTypeDescription: String,
    
    // Website service fields
    isWebsiteService: {
      type: Boolean,
      default: false
    },
    totalPages: {
      type: Number,
      min: 4,  // Minimum 4 pages (fixed pages)
      max: 50, // Maximum changed to 50 pages
      validate: {
        validator: function(value) {
          return !this.isWebsiteService || (value >= 4 && value <= 50);
        },
        message: 'Website services must have between 4 and 50 pages'
      }
    },
    checkpoints: {
      type: [checkpointSchema],
      validate: {
        validator: function(checkpoints) {
          if (!this.isWebsiteService) return true;
          
          // Required base pages validation
          const requiredPages = [
            "Home Page",
            "About Us Page",
            "Contact Us Page",
            "Gallery Page"
          ];
          
          const hasAllRequiredPages = requiredPages.every(page => 
            checkpoints.some(checkpoint => checkpoint.name === page)
          );
          
          // Total percentage validation
          const totalPercentage = checkpoints.reduce(
            (sum, checkpoint) => sum + checkpoint.percentage, 
            0
          );
          
          return hasAllRequiredPages && Math.round(totalPercentage) === 100;
        },
        message: 'Invalid checkpoints configuration'
      }
    }
}, {
    timestamps: true
});

// Set isWebsiteService based on category
productSchema.pre('save', function(next) {
  const websiteCategories = ['static_websites', 'standard_websites', 'dynamic_websites'];
  this.isWebsiteService = websiteCategories.includes(this.category);
  next();
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;