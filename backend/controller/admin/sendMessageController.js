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
        .populate('userId', 'name email')  // Populate user details
        .populate('productId')             // Populate product details

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

        // Get the io instance from req (added by middleware)
        const io = req.io

        // Emit update to the specific user
        if (io) {
            io.to(`user_${project.userId._id}`).emit('projectUpdate', {
                projectId: project._id,
                data: {
                    messages: project.messages,
                    projectProgress: project.projectProgress,
                    checkpoints: project.checkpoints
                }
            })
        }

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