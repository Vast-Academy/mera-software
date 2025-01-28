const uploadBannerPermission = require("../../helpers/permission")
const bannerModel = require("../../models/bannerModel")

async function UploadBannerController(req, res) {
    try {
        const sessionUserId = req.userId;
        if (!uploadBannerPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const { images, serviceName, isActive, displayOrder, position } = req.body;

        // Validate required fields
        if (!images || images.length === 0) {
            throw new Error("At least one banner image is required");
        }
        if (!position) {
            throw new Error("Position is required");
        }
        if (!serviceName) {
            throw new Error("Service name is required");
        }
        if (typeof displayOrder !== 'number') {
            throw new Error("Display order must be a number");
        }

        // Check for existing banner with same position and display order
        const existingBanner = await bannerModel.findOne({
            position,
            displayOrder
        });

        if (existingBanner) {
            throw new Error(`Banner with display order ${displayOrder} already exists for this position`);
        }

        // Create banner with updated fields
        const uploadBanner = new bannerModel({
            images,
            serviceName,
            position,
            isActive: isActive !== undefined ? isActive : true,
            displayOrder: displayOrder || 0
        });

        const saveBanner = await uploadBanner.save();

        res.status(201).json({
            message: "Banner uploaded successfully",
            error: false,
            success: true,
            data: saveBanner
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Error uploading banner",
            error: true,
            success: false
        });
    }
}

module.exports = UploadBannerController;