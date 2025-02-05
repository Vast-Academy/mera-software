const uploadProductPermission = require("../../helpers/permission")
const orderModel = require("../../models/orderProductModel")

async function updateProgressController(req, res) {
    try {
        const sessionUserId = req.userId
        if(!await uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const { projectId, checkpointId, completed } = req.body

        const project = await orderModel.findById(projectId)
        if (!project) {
            throw new Error("Project not found")
        }

        // Update the specific checkpoint
        const checkpointIndex = project.checkpoints.findIndex(
            cp => cp.checkpointId === checkpointId
        )

        if (checkpointIndex === -1) {
            throw new Error("Checkpoint not found")
        }

        project.checkpoints[checkpointIndex].completed = completed
        project.checkpoints[checkpointIndex].completedAt = completed ? new Date() : null

        // Save the updated project
        await project.save()

        res.status(200).json({
            message: "Progress updated successfully",
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

module.exports = updateProgressController