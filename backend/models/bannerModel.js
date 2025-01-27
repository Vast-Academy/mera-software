const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: true
    }],
    serviceName: {
        type: String, 
        required : true,
    },
    bannerType: {
        type: String,
        enum: ['top', 'inBetween'],
        required: true
    },
    position: {
        type: String,
        enum: [
            'home',
            'static_websites',
            'standard_websites',
            'dynamic_websites',
            'website_updates',
            'mobile_apps',
            'web_applications',
            'app_update',
            'feature_upgrades',
        ],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const bannerModel = mongoose.model('Banner', bannerSchema);

module.exports = bannerModel