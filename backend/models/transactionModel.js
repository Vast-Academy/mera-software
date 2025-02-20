const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['payment', 'refund', 'deposit'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    relatedOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    }
}, {
    timestamps: true
});

const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;