const mongoose = require('mongoose');

// Message Schema for project communication
const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Checkpoint progress tracking
const checkpointProgressSchema = new mongoose.Schema({
    checkpointId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: Date,
    percentage: Number
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    projectProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    // New fields for project management
    isWebsiteProject: {
        type: Boolean,
        default: false
    },
    checkpoints: [checkpointProgressSchema],
    messages: [messageSchema],
    currentPhase: {
        type: String,
        enum: ['planning', 'development', 'review', 'completed'],
        default: 'planning'
    },
    expectedCompletionDate: Date,
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Middleware to update lastUpdated
orderSchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

// Middleware to update projectProgress based on checkpoints
orderSchema.pre('save', function(next) {
    if (this.isWebsiteProject && this.checkpoints.length > 0) {
        const completedCheckpoints = this.checkpoints.filter(cp => cp.completed);
        const totalPercentage = completedCheckpoints.reduce((sum, cp) => sum + cp.percentage, 0);
        this.projectProgress = Math.min(totalPercentage, 100);
    }
    next();
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;