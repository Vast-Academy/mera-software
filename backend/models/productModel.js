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
    formattedDescriptions: [{
      content: {
          type: String,
          required: true
      }
  }],
    
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
    },
    isFeatureUpgrade: {
      type: Boolean,
      default: false
    },
    upgradeType: {
      type: String,
      enum: ['', 'feature', 'component'],
      validate: {
        validator: function(value) {
          return !this.isFeatureUpgrade || ['feature', 'component'].includes(value);
        },
        message: 'Feature upgrades must specify a valid upgrade type'
      }
    },
    
    compatibleCategories : [String],
    keyBenefits : [String],
    isWebsiteUpdate: {
      type: Boolean,
      default: false
  },
  validityPeriod: {
    type: Number,  // Now storing in days instead of months
    validate: {
      validator: function(value) {
        if (!this.isWebsiteUpdate) return true;
        // Value must be positive and not exceed 365 days (1 year)
        return value > 0 && value <= 365;
      },
      message: 'Website update services must have a valid period between 1 and 365 days'
    }
  },
  updateCount: {
    type: Number,  // Store in months
    validate: {
        validator: function(value) {
            return !this.isWebsiteUpdate || (value > 0);
        },
        message: 'Update count must be greater than 0'
    }
},
    additionalFeatures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'  // References the same Product model
  }]
}, {
    timestamps: true
});

// Set isWebsiteService based on category
productSchema.pre('save', function(next) {
  const websiteCategories = ['standard_websites', 'dynamic_websites', 'cloud_software_development', 'app_development'];
  this.isWebsiteService = websiteCategories.includes(this.category);
  this.isFeatureUpgrade = this.category === 'feature_upgrades';
  this.isWebsiteUpdate = this.category === 'website_updates'; 

  // If it's not a website service, ensure additionalFeatures is empty
  if (!this.isWebsiteService) {
    this.additionalFeatures = [];
}
  next();
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;