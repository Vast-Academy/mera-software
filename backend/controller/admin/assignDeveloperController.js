const assignDeveloperPermission = require("../../helpers/permission")
const developerModel = require("../../models/developerModel")
const orderModel = require("../../models/orderProductModel")

async function assignDeveloperController(req, res) {
    try {
        const sessionUserId = req.userId
        
        // Check if user has permission
        if (!assignDeveloperPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const { projectId, developerId } = req.body

        if (!projectId || !developerId) {
            throw new Error("Project ID and Developer ID are required")
        }

        // Find the project
        const project = await orderModel.findById(projectId)
        if (!project) {
            throw new Error("Project not found")
        }

        // Find the developer
        const developer = await developerModel.findById(developerId)
        if (!developer) {
            throw new Error("Developer not found")
        }

        // Check if developer can take more projects
        if (developer.activeProjects.length >= developer.workload.maxProjects) {
            throw new Error("Developer has reached maximum project capacity")
        }

        // Assign developer to project
        project.assignedDeveloper = developerId
        project.assignedAt = new Date()
        await project.save()

        // Add project to developer's active projects
        await developer.assignProject(projectId, {
            projectName: project.productId ? project.productId.serviceName : "New Project",
            role: "Developer"
        })

        res.status(200).json({
            message: "Developer assigned successfully",
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

module.exports = assignDeveloperController