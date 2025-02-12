const WelcomeContent = require("../../models/welcomeContent")

async function getWelcomeController(req, res) {
    try {
        const content = await WelcomeContent.findOne({ isActive: true })
            .sort({ displayOrder: 1 })
        
        if (!content) {
            throw new Error("No active welcome content found")
        }

        res.status(200).json({
            message: "Welcome Content Fetched Successfully",
            error: false,
            success: true,
            data: content
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getWelcomeController