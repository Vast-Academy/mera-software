const bannerModel = require("../../models/bannerModel")

const getBannersController = async (req, res) => {
    try {
        // Only get active banners
        const allBanners = await bannerModel.find({ isActive: true })
            .sort({ order: 1 })
       
        console.log("Sending banners:", allBanners); // Debug log
       
        res.json({
            message: "All Banners",
            success: true,
            error: false,
            data: allBanners
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getBannersController