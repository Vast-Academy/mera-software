const mongoose = require("mongoose")

const referralSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    referredDate: {
        type: Date,
        default: Date.now
    }
}, { _id: false })

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: String,
    profilePic : String,
    phone: String,     // Added phone field
    dob: {                    // New field: Date of Birth
      type: Date
    },
    age: Number,      // Added age field
    roles: {
        type: [String],
        required: true,
        default: []
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    walletBalance: {
        type: Number,
        default: 0    
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    referrals: [referralSchema],
    userDetails: {
    bankAccounts: [
    {
      bankName: String,
      bankAccountNumber: String,
      bankIFSCCode: String,
      accountHolderName: String,
      upiId: String,
      qrCode: String, // URL to uploaded QR code image
      isPrimary: {
        type: Boolean,
        default: false
      }
    }
  ],
  kycDocuments: {
    aadharFrontPhoto: String, // URL or base64
    aadharBackPhoto: String,
    panCard: String,
    selfiePhoto: String
  },
  address: {
    streetAddress: String,
    city: String,
    state: String,
    pinCode: String,
    landmark: String
  },
  isDetailsCompleted: {
    type: Boolean,
    default: false
  }
}
},{
    timestamps: true
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel
