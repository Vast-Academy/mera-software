const uploadPermission = require("../../helpers/permission")
// const WelcomeContent = require("../../models/welcomeContent")

async function updateWelcomeController(req, res) {
    try {
        const sessionUserId = req.userId
        if(!uploadPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const contentId = req.params.id
        
        // If setting this content as active, deactivate others
        if (req.body.isActive) {
            await WelcomeContent.updateMany(
                { _id: { $ne: contentId } },
                { isActive: false }
            )
        }

        const updatedContent = await WelcomeContent.findByIdAndUpdate(
            contentId,
            req.body,
            { new: true }
        )

        if (!updatedContent) {
            throw new Error("Welcome content not found")
        }

        res.status(200).json({
            message: "Welcome Content Updated Successfully",
            error: false,
            success: true,
            data: updatedContent
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateWelcomeController