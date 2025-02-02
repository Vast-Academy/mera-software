const DeveloperModel = require("../../models/developerModel")


const getAllDevelopersController = async (req, res) => {
    try {
        const allDevelopers = await DeveloperModel.find()
            .sort({ createdAt: -1 })
            .select('-notifications') // Excluding notifications array to reduce response size
            .lean()

        res.json({
            message: "All Developers",
            success: true,
            error: false,
            data: allDevelopers
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getAllDevelopersController