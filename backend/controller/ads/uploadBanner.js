const uploadBannerPermission = require("../../helpers/permission")
const bannerModel = require("../../models/bannerModel")

async function UploadBannerController(req, res) {
    try {
        const sessionUserId = req.userId;
        if (!uploadBannerPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const { images, serviceName, isActive, order, position, bannerType } = req.body;

        // Validate required fields
        if (!images || images.length === 0) {
            throw new Error("At least one banner image is required");
        }

        if (!position) {
            throw new Error("Position is required");
        }

        if (!bannerType) {
            throw new Error("Banner type is required");
        }

        // Validate serviceName if provided
        if (serviceName && typeof serviceName !== "string") {
            throw new Error("Invalid service name format");
        }

        // Create banner with all required fields
        const uploadBanner = new bannerModel({
            images,
            serviceName,
            position,        // Adding required position field
            bannerType,      // Adding required bannerType field
            isActive: isActive !== undefined ? isActive : true,
            order: order !== undefined ? order : 0
        });

        const saveBanner = await uploadBanner.save();

        res.status(201).json({
            message: "Banner Uploaded Successfully",
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