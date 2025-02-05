const uploadProductPermission = require("../../helpers/permission")
const orderModel = require("../../models/orderProductModel")

async function sendMessageController(req, res) {
    try {
        const sessionUserId = req.userId
        if(!await uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const { projectId, message } = req.body

        const project = await orderModel.findById(projectId)
        if (!project) {
            throw new Error("Project not found")
        }

        // Add new message
        project.messages.push({
            sender: 'admin',
            message: message,
            timestamp: new Date()
        })

        // Save the updated project
        await project.save()

        res.status(200).json({
            message: "Message sent successfully",
            error: false,
            success: true,
            data: project
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = sendMessageController