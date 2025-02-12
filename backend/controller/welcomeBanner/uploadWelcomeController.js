// const uploadPermission = require("../../helpers/permission")
// const WelcomeContent = require("../../models/welcomeContent")

// async function uploadWelcomeController(req, res) {
//     try {
//         const sessionUserId = req.userId
//         if(!uploadPermission(sessionUserId)){
//             throw new Error("Permission denied")
//         }

//         if (req.body.isActive) {
//             await WelcomeContent.updateMany(
//                 { _id: { $ne: null } },
//                 { isActive: false }
//             )
//         }

//         const welcomeContent = new WelcomeContent(req.body)
//         const savedContent = await welcomeContent.save()
        
//         res.status(201).json({
//             message: "Welcome Content Created Successfully",
//             error: false,
//             success: true,
//             data: savedContent
//         })
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         })
//     }
// }

// module.exports = uploadWelcomeController