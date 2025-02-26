const mongoose = require('mongoose');

const updateRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  updatePlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: true
  },
  instructions: [{
    text: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  files: [{
    filename: String,
    originalName: String,
    path: String,
    type: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'rejected'],
    default: 'pending'
  },
  assignedDeveloper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    default: null
  },
  developerNotes: [{
    text: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  developerMessages: [{
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  completedAt: Date,
}, {
  timestamps: true
});

// Virtual field to get the completed status
updateRequestSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Middleware to auto-update timestamps
updateRequestSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

// Create indexes for better query performance
updateRequestSchema.index({ userId: 1, createdAt: -1 });
updateRequestSchema.index({ updatePlanId: 1 });
updateRequestSchema.index({ status: 1 });
updateRequestSchema.index({ assignedDeveloper: 1, status: 1 });

const updateRequestModel = mongoose.model('UpdateRequest', updateRequestSchema);

module.exports = updateRequestModel;