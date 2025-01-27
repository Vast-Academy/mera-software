const uploadProductPermission = require("../../helpers/permission")
const bannerModel = require("../../models/bannerModel")

async function updateBannerController(req, res) {
    try {
        // Check permission
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        // Extract _id and rest of the body
        const { _id, ...resBody } = req.body

        // Update banner
        const updatedBanner = await bannerModel.findByIdAndUpdate(
            _id,
            resBody,
            { new: true } // यह option updated document return करेगा
        )

        if (!updatedBanner) {
            throw new Error("Banner not found")
        }

        res.json({
            message: "Banner Updated Successfully",
            success: true,
            error: false,
            data: updatedBanner
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateBannerController