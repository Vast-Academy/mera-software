const uploadPermission = require("../../helpers/permission")
// const WelcomeContent = require("../../models/welcomeContent")

async function deleteWelcomeController(req, res) {
    try {
        const sessionUserId = req.userId
        if(!uploadPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const contentId = req.params.id
        const deletedContent = await WelcomeContent.findByIdAndDelete(contentId)

        if (!deletedContent) {
            throw new Error("Welcome content not found")
        }

        res.status(200).json({
            message: "Welcome Content Deleted Successfully",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteWelcomeController