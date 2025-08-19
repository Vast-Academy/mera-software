const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        transactionId: {
            type: String,
            required: true,
            unique: true
        },
        upiTransactionId: { // Add this field
            type: String,
            default: null
          },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending"
        },
        type: {
            type: String,
            enum: ["deposit", "payment", "refund"],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number
        },
        paymentMethod: {
            type: String,
            enum: ["wallet", "upi", "combined"],
            default: "upi"
        },
         // Add parentTransactionId for combined payments
        parentTransactionId: {
            type: String,
            default: null
        },
        paymentDetails: {
            type: Object
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        date: {
            type: Date,
            default: Date.now
        },
        isInstallmentPayment: {
            type: Boolean,
            default: false
        },
        installmentNumber: {
            type: Number
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order"
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        partnerWalletCredited: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;